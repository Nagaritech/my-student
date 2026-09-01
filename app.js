use strict";

/* =========================================================
   MY STUDENT
   STUDENT RESULT MANAGEMENT SYSTEM
   COMPLETE APP.JS
   OFFLINE VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     DATA
  ========================================================= */

  let students =
    JSON.parse(localStorage.getItem("myStudents")) || [];

  let subjects =
    JSON.parse(localStorage.getItem("mySubjects")) || [];

  let settings =
    JSON.parse(localStorage.getItem("mySchoolSettings")) || {
      schoolName: "",
      schoolAddress: "",
      teacherName: "",
      className: "",
      session: "",
      term: "First Term",
      logo: ""
    };

  let calculationDone =
    localStorage.getItem("calculationDone") === "true";

  let positionDone =
    localStorage.getItem("positionDone") === "true";

  let averageEnabled =
    localStorage.getItem("averageEnabled") !== "false";


  /* =========================================================
     ELEMENTS
  ========================================================= */

  const studentCount =
    document.getElementById("studentCount");

  const subjectCount =
    document.getElementById("subjectCount");

  const calculationStatus =
    document.getElementById("calculationStatus");

  const positionStatus =
    document.getElementById("positionStatus");

  const addStudentBtn =
    document.getElementById("addStudentBtn");

  const addSubjectBtn =
    document.getElementById("addSubjectBtn");

  const calculateBtn =
    document.getElementById("calculateBtn");

  const positionBtn =
    document.getElementById("positionBtn");

  const printReportBtn =
    document.getElementById("printReportBtn");

  const downloadPdfBtn =
    document.getElementById("downloadPdfBtn");

  const clearDataBtn =
    document.getElementById("clearDataBtn");

  const reportPreview =
    document.getElementById("reportPreview");

  const menuToggle =
    document.getElementById("menuToggle");

  const sideMenu =
    document.getElementById("sideMenu");

  const menuOverlay =
    document.getElementById("menuOverlay");

  const sideMenuClose =
    document.getElementById("sideMenuClose");


  /* =========================================================
     SAVE DATA
  ========================================================= */

  function saveData() {

    localStorage.setItem(
      "myStudents",
      JSON.stringify(students)
    );

    localStorage.setItem(
      "mySubjects",
      JSON.stringify(subjects)
    );

    localStorage.setItem(
      "mySchoolSettings",
      JSON.stringify(settings)
    );

    localStorage.setItem(
      "calculationDone",
      String(calculationDone)
    );

    localStorage.setItem(
      "positionDone",
      String(positionDone)
    );

    localStorage.setItem(
      "averageEnabled",
      String(averageEnabled)
    );
  }


  /* =========================================================
     ESCAPE HTML
  ========================================================= */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* =========================================================
     ORDINAL
  ========================================================= */

  function ordinal(number) {

    const n = Number(number);

    if (!Number.isFinite(n)) {
      return "—";
    }

    if (
      n % 100 >= 11 &&
      n % 100 <= 13
    ) {
      return n + "th";
    }

    switch (n % 10) {

      case 1:
        return n + "st";

      case 2:
        return n + "nd";

      case 3:
        return n + "rd";

      default:
        return n + "th";
    }
  }


  /* =========================================================
     GRADE
  ========================================================= */

  function getGrade(score) {

    const mark = Number(score);

    if (mark >= 80) {
      return "A";
    }

    if (mark >= 70) {
      return "B";
    }

    if (mark >= 60) {
      return "C";
    }

    if (mark >= 50) {
      return "D";
    }

    return "E";
  }


  function getGradeRemark(score) {

    const mark = Number(score);

    if (mark >= 80) {
      return "Excellent";
    }

    if (mark >= 70) {
      return "Very Good";
    }

    if (mark >= 60) {
      return "Good";
    }

    if (mark >= 50) {
      return "Fair";
    }

    return "Poor";
  }


  /* =========================================================
     TIME GREETING
  ========================================================= */

  function updateGreeting() {

    const greeting =
      document.querySelector(
        ".welcome-label"
      );

    if (!greeting) {
      return;
    }

    const hour =
      new Date().getHours();

    let text =
      "Good Evening";

    if (hour < 12) {
      text =
        "Good Morning";
    } else if (hour < 17) {
      text =
        "Good Afternoon";
    }

    greeting.textContent =
      text + " 👋";
  }


  /* =========================================================
     MESSAGE SYSTEM
  ========================================================= */

  function showMessage(
    title,
    message,
    type = "success",
    duration = 4000
  ) {

    let box =
      document.querySelector(
        "#quickActionMessage"
      );

    const card =
      document.querySelector(
        ".quick-actions-card"
      );

    if (!box && card) {

      box =
        document.createElement("div");

      box.id =
        "quickActionMessage";

      box.className =
        "quick-action-message";

      card.appendChild(box);
    }

    if (!box) {

      alert(
        title +
        "\n\n" +
        String(message)
          .replace(/<[^>]*>/g, "")
      );

      return;
    }

    let icon =
      "✓";

    if (type === "warning") {
      icon = "⚠️";
    }

    if (type === "loading") {
      icon = "⏳";
    }

    if (type === "info") {
      icon = "ℹ️";
    }

    box.className =
      "quick-action-message " +
      type;

    box.innerHTML = `

      <div class="success-animation">

        <div class="success-icon">
          ${icon}
        </div>

        <div class="action-message-title">
          ${escapeHTML(title)}
        </div>

        <div class="action-message-text">
          ${message}
        </div>

      </div>

    `;

    if (duration > 0) {

      setTimeout(function () {

        if (box) {
          box.innerHTML = "";
          box.className =
            "quick-action-message-container";
        }

      }, duration);
    }
                          }
=========================================================
     CUSTOM CONFIRM MODAL
     NO BROWSER WARNING
  ========================================================= */

  function customConfirm(
    title,
    message,
    confirmText,
    callback
  ) {

    const old =
      document.getElementById(
        "myConfirmModal"
      );

    if (old) {
      old.remove();
    }

    const modal =
      document.createElement("div");

    modal.id =
      "myConfirmModal";

    modal.className =
      "modal";

    modal.innerHTML = `

      <div
        class="modal-content"
        style="max-width:460px;"
      >

        <div class="modal-header">

          <h3>
            ${escapeHTML(title)}
          </h3>

          <button
            type="button"
            class="modal-close"
            id="confirmClose"
          >
            ×
          </button>

        </div>

        <div
          style="
            padding:10px 0 18px;
            line-height:1.6;
          "
        >

          <div
            style="
              font-size:42px;
              text-align:center;
              margin-bottom:10px;
            "
          >
            ⚠️
          </div>

          <p
            style="
              text-align:center;
              margin:0;
            "
          >
            ${message}
          </p>

        </div>

        <div
          style="
            display:flex;
            gap:10px;
          "
        >

          <button
            type="button"
            class="btn btn-light"
            id="confirmCancel"
            style="flex:1;"
          >
            Cancel
          </button>

          <button
            type="button"
            class="btn btn-danger"
            id="confirmOk"
            style="flex:1;"
          >
            ${escapeHTML(
              confirmText || "Continue"
            )}
          </button>

        </div>

      </div>

    `;

    document.body.appendChild(modal);

    function close() {
      modal.remove();
    }

    document
      .getElementById("confirmClose")
      ?.addEventListener(
        "click",
        close
      );

    document
      .getElementById("confirmCancel")
      ?.addEventListener(
        "click",
        close
      );

    document
      .getElementById("confirmOk")
      ?.addEventListener(
        "click",
        function () {

          close();

          callback();

        }
      );
  }


  /* =========================================================
     DASHBOARD
  ========================================================= */

  function updateDashboard() {

    if (studentCount) {

      studentCount.textContent =
        students.length;
    }

    if (subjectCount) {

      subjectCount.textContent =
        subjects.length;
    }

    if (calculationStatus) {

      calculationStatus.textContent =
        calculationDone
          ? "Done"
          : "—";
    }

    if (positionStatus) {

      positionStatus.textContent =
        positionDone
          ? "Done"
          : "—";
    }
  }


  /* =========================================================
     SIDE MENU
  ========================================================= */

  function openMenu() {

    if (sideMenu) {

      sideMenu.classList.add("open");

      sideMenu.setAttribute(
        "aria-hidden",
        "false"
      );
    }

    if (menuOverlay) {

      menuOverlay.classList.add(
        "active"
      );
    }

    if (menuToggle) {

      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );
    }

    document.body.classList.add(
      "menu-open"
    );
  }


  function closeMenu() {

    if (sideMenu) {

      sideMenu.classList.remove("open");

      sideMenu.setAttribute(
        "aria-hidden",
        "true"
      );
    }

    if (menuOverlay) {

      menuOverlay.classList.remove(
        "active"
      );
    }

    if (menuToggle) {

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }

    document.body.classList.remove(
      "menu-open"
    );
  }


  if (menuToggle) {

    menuToggle.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();

        if (
          sideMenu &&
          sideMenu.classList.contains("open")
        ) {

          closeMenu();

        } else {

          openMenu();
        }

      }
    );
  }


  if (sideMenuClose) {

    sideMenuClose.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        closeMenu();

      }
    );
  }


  if (menuOverlay) {

    menuOverlay.addEventListener(
      "click",
      closeMenu
    );
                          }    


  /* =========================================================
     ACTIVE MENU
  ========================================================= */

  function activateMenu(id) {

    document
      .querySelectorAll(".menu-item")
      .forEach(
        function (item) {

          item.classList.remove(
            "active"
          );

        }
      );

    const item =
      document.getElementById(id);

    if (item) {

      item.classList.add(
        "active"
      );
    }
  }


  /* =========================================================
     INPUT MODAL
  ========================================================= */

  function openInputModal(
    title,
    label,
    placeholder,
    callback
  ) {

    const old =
      document.getElementById(
        "myStudentInputModal"
      );

    if (old) {
      old.remove();
    }

    const modal =
      document.createElement("div");

    modal.id =
      "myStudentInputModal";

    modal.className =
      "modal";

    modal.innerHTML = `

      <div class="modal-content">

        <div class="modal-header">

          <h3>
            ${escapeHTML(title)}
          </h3>

          <button
            type="button"
            class="modal-close"
            id="inputClose"
          >
            ×
          </button>

        </div>

        <div class="form-group">

          <label>
            ${escapeHTML(label)}
          </label>

          <input
            type="text"
            id="modalInput"
            class="form-control"
            placeholder="${escapeHTML(
              placeholder
            )}"
            autocomplete="off"
          >

        </div>

        <div
          style="
            display:flex;
            gap:10px;
            margin-top:18px;
          "
        >

          <button
            type="button"
            class="btn btn-light"
            id="inputCancel"
            style="flex:1"
          >
            Cancel
          </button>

          <button
            type="button"
            class="btn btn-primary"
            id="inputSave"
            style="flex:1"
          >
            Add
          </button>

        </div>

      </div>

    `;

    document.body.appendChild(modal);

    const input =
      document.getElementById(
        "modalInput"
      );

    const close =
      document.getElementById(
        "inputClose"
      );

    const cancel =
      document.getElementById(
        "inputCancel"
      );

    const save =
      document.getElementById(
        "inputSave"
      );

    function closeModal() {

      modal.remove();
    }

    close?.addEventListener(
      "click",
      closeModal
    );

    cancel?.addEventListener(
      "click",
      closeModal
    );

    save?.addEventListener(
      "click",
      function () {

        const value =
          input.value.trim();

        if (!value) {

          input.focus();

          return;
        }

        callback(value);

        closeModal();

      }
    );

    input?.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key ===
          "Enter"
        ) {

          event.preventDefault();

          save?.click();
        }

        if (
          event.key ===
          "Escape"
        ) {

          closeModal();
        }

      }
    );

    setTimeout(
      function () {
        input?.focus();
      },
      100
    );
      }
/* =========================================================
     ADD STUDENT
  ========================================================= */

  function addStudent() {

    openInputModal(
      "Add Student",
      "Student Name",
      "Enter student name",
      function (name) {

        const exists =
          students.some(
            function (student) {

              return String(
                student.name
              )
                .trim()
                .toLowerCase() ===
                name
                  .trim()
                  .toLowerCase();

            }
          );

        if (exists) {

          showMessage(
            "Student Already Exists",
            escapeHTML(name),
            "warning"
          );

          return;
        }

        students.push({

          id:
            "STU-" +
            Date.now() +
            "-" +
            Math.floor(
              Math.random() *
              10000
            ),

          name:
            name.trim(),

          marks: {},

          total: 0,

          average: 0,

          position: null

        });

        calculationDone = false;

        positionDone = false;

        saveData();

        updateDashboard();

        renderReport();

        showMessage(
          "Student Added Successfully",
          `
            ${escapeHTML(name)}
            <br>
            <small>
              Student No: ${students.length}
            </small>
          `,
          "success"
        );
      }
    );
  }


  /* =========================================================
     ADD SUBJECT
  ========================================================= */

  function addSubject() {

    openInputModal(
      "Add Subject",
      "Subject Name",
      "Enter subject name",
      function (name) {

        const exists =
          subjects.some(
            function (subject) {

              return String(
                subject.name
              )
                .trim()
                .toLowerCase() ===
                name
                  .trim()
                  .toLowerCase();

            }
          );

        if (exists) {

          showMessage(
            "Subject Already Exists",
            escapeHTML(name),
            "warning"
          );

          return;
        }

        subjects.push({

          id:
            "SUB-" +
            Date.now() +
            "-" +
            Math.floor(
              Math.random() *
              10000
            ),

          name:
            name.trim()

        });

        calculationDone = false;

        positionDone = false;

        students.forEach(
          function (student) {

            if (!student.marks) {
              student.marks = {};
            }

          }
        );

        saveData();

        updateDashboard();

        renderReport();

        showMessage(
          "Subject Added Successfully",
          escapeHTML(name),
          "success"
        );
      }
    );
  }


  /* =========================================================
     AVERAGE
  ========================================================= */

  function toggleAverage() {

    averageEnabled =
      !averageEnabled;

    saveData();

    renderReport();

    updateAverageButton();

    showMessage(
      averageEnabled
        ? "Average Enabled"
        : "Average Disabled",

      averageEnabled
        ? "Average is now included in the result."
        : "Average is now hidden from the result.",

      "info"
    );
  }


  function updateAverageButton() {

    const button =
      document.getElementById(
        "addAverageBtn"
      );

    if (!button) {
      return;
    }

    const title =
      button.querySelector(
        ".action-title"
      );

    const description =
      button.querySelector(
        ".action-description"
      );

    if (title) {

      title.textContent =
        averageEnabled
          ? "Average: ON"
          : "Average";
    }

    if (description) {

      description.textContent =
        averageEnabled
          ? "Average is enabled"
          : "Optional average view";
    }
  }


  /* =========================================================
     CREATE AVERAGE BUTTON IF MISSING
  ========================================================= */

  function ensureAverageButton() {

    const grid =
      document.querySelector(
        ".action-grid"
      );

    if (!grid) {
      return;
    }

    let button =
      document.getElementById(
        "addAverageBtn"
      );

    if (button) {

      updateAverageButton();

      return;
    }

    button =
      document.createElement(
        "button"
      );

    button.type =
      "button";

    button.id =
      "addAverageBtn";

    button.className =
      "action-btn average-action";

    button.innerHTML = `

      <span class="icon">
        📊
      </span>

      <span class="action-title">
        Average
      </span>

      <span class="action-description">
        Optional average view
      </span>

    `;

    grid.appendChild(button);

    button.addEventListener(
      "click",
      toggleAverage
    );

    updateAverageButton();
  }


  /* =========================================================
     MARK INPUT
  ========================================================= */

  function handleMarkInput(
    studentId,
    subjectId,
    value
  ) {

    const student =
      students.find(
        function (item) {

          return String(item.id) ===
            String(studentId);

        }
      );

    if (!student) {
      return;
    }

    if (!student.marks) {
      student.marks = {};
    }

    let mark =
      value === ""
        ? ""
        : Number(value);

    if (mark !== "") {

      if (!Number.isFinite(mark)) {
        mark = "";
      }

      if (mark < 0) {
        mark = 0;
      }

      if (mark > 100) {
        mark = 100;
      }
    }

    student.marks[subjectId] =
      mark;

    calculationDone = false;

    positionDone = false;

    saveData();

    updateDashboard();

    updateRowCalculations(
      studentId
    );
  }


  /* =========================================================
     UPDATE ONE ROW
  ========================================================= */

  function updateRowCalculations(
    studentId
  ) {

    const student =
      students.find(
        function (item) {

          return String(item.id) ===
            String(studentId);

        }
      );

    if (!student) {
      return;
    }

    let total = 0;

    let count = 0;

    subjects.forEach(
      function (subject) {

        const value =
          Number(
            student.marks?.[
              subject.id
            ]
          );

        if (
          Number.isFinite(value)
        ) {

          total += value;

          count++;
        }

      }
    );

    student.total =
      total;

    student.average =
      count > 0
        ? total / count
        : 0;

    student.position =
      null;

    const row =
      document.querySelector(
        `tr[data-student-id="${CSS.escape(
          String(studentId)
        )}"]`
      );

    if (!row) {
      return;
    }

    const totalCell =
      row.querySelector(
        ".student-total"
      );

    const averageCell =
      row.querySelector(
        ".student-average"
      );

    const positionCell =
      row.querySelector(
        ".student-position"
      );

    if (totalCell) {
      totalCell.textContent =
        total;
    }

    if (averageCell) {
      averageCell.textContent =
        averageEnabled
          ? student.average.toFixed(2)
          : "—";
    }

    if (positionCell) {
      positionCell.textContent =
        "—";
    }
      }

  /* =========================================================
     CALCULATE MARKS
  ========================================================= */

  function calculateMarks() {

    if (
      students.length === 0
    ) {

      showMessage(
        "No Students Yet",
        "Please add students first.",
        "warning"
      );

      return;
    }

    if (
      subjects.length === 0
    ) {

      showMessage(
        "No Subjects Yet",
        "Please add subjects first.",
        "warning"
      );

      return;
    }

    if (calculateBtn) {
      calculateBtn.disabled = true;
    }

    showMessage(
      "Calculating Results...",
      `
        Please wait while the system
        calculates all student results.

        <div class="calculation-bar">

          <div
            class="calculation-progress"
            id="calculationProgress"
            style="width:0%;"
          ></div>

        </div>
      `,
      "loading",
      0
    );

    let progress = 0;

    const timer =
      setInterval(
        function () {

          progress += 5;

          const bar =
            document.getElementById(
              "calculationProgress"
            );

          if (bar) {

            bar.style.width =
              progress + "%";
          }

          if (progress >= 100) {

            clearInterval(timer);

            finishCalculation();
          }

        },
        50
      );
  }


  /* =========================================================
     FINISH CALCULATION
  ========================================================= */

  function finishCalculation() {

    students.forEach(
      function (student) {

        if (!student.marks) {
          student.marks = {};
        }

        let total = 0;

        let count = 0;

        subjects.forEach(
          function (subject) {

            let value =
              Number(
                student.marks[
                  subject.id
                ]
              );

            if (
              Number.isFinite(value)
            ) {

              if (value < 0) {
                value = 0;
              }

              if (value > 100) {
                value = 100;
              }

              student.marks[
                subject.id
              ] = value;

              total += value;

              count++;
            }

          }
        );

        student.total =
          total;

        student.average =
          count > 0
            ? total / count
            : 0;

        student.position =
          null;

      }
    );

    calculationDone = true;

    positionDone = false;

    saveData();

    updateDashboard();

    renderReport();

    showMessage(
      "Calculation Completed",
      "All student results have been calculated successfully.",
      "success"
    );

    if (calculateBtn) {
      calculateBtn.disabled = false;
    }
  }


  /* =========================================================
     MAKE POSITION
  ========================================================= */

  function makePosition() {

    if (
      students.length === 0
    ) {

      showMessage(
        "No Students Yet",
        "Please add students first.",
        "warning"
      );

      return;
    }

    if (
      subjects.length === 0
    ) {

      showMessage(
        "No Subjects Yet",
        "Please add subjects first.",
        "warning"
      );

      return;
    }

    if (!calculationDone) {

      showMessage(
        "Calculate Results First",
        "Please calculate the student results before making position.",
        "warning"
      );

      return;
    }

    if (positionBtn) {
      positionBtn.disabled = true;
    }

    showMessage(
      "Making Positions...",
      `
        Please wait while the system
        ranks all students.

        <div class="calculation-bar">

          <div
            class="calculation-progress"
            id="positionProgress"
            style="width:0%;"
          ></div>

        </div>
      `,
      "loading",
      0
    );

    let progress = 0;

    const timer =
      setInterval(
        function () {

          progress += 5;

          const bar =
            document.getElementById(
              "positionProgress"
            );

          if (bar) {

            bar.style.width =
              progress + "%";
          }

          if (progress >= 100) {

            clearInterval(timer);

            finishPosition();
          }

        },
        50
      );
  }


  /* =========================================================
     FINISH POSITION
  ========================================================= */

  function finishPosition() {

    const sorted =
      [...students].sort(
        function (a, b) {

          return Number(
            b.total || 0
          ) -
          Number(
            a.total || 0
          );

        }
      );

    let currentPosition = 0;

    let previousTotal = null;

    sorted.forEach(
      function (student, index) {

        const total =
          Number(
            student.total || 0
          );

        if (
          previousTotal === null ||
          total !== previousTotal
        ) {

          currentPosition =
            index + 1;
        }

        student.position =
          currentPosition;

        previousTotal =
          total;
      }
    );

    students =
      students.map(
        function (original) {

          return (
            sorted.find(
              function (item) {

                return String(
                  item.id
                ) ===
                String(
                  original.id
                );

              }
            ) ||
            original
          );

        }
      );

    positionDone = true;

    saveData();

    updateDashboard();

    renderReport();

    showMessage(
      "Position Completed",
      "Student positions have been calculated successfully.",
      "success"
    );

    if (positionBtn) {
      positionBtn.disabled = false;
    }
  }


  /* =========================================================
     REPORT TABLE
  ========================================================= */

  function renderReport() {

    if (!reportPreview) {
      return;
    }

    if (
      students.length === 0 ||
      subjects.length === 0
    ) {

      reportPreview.innerHTML = `

        <div class="empty-state">

          <div class="empty-icon">
            📄
          </div>

          <h3>
            Report Not Ready
          </h3>

          <p>
            Add students and subjects,
            then enter marks.
          </p>

        </div>

      `;

      return;
    }

    let html = `

      <div class="report-table-wrapper">

        <table class="report-table">

          <thead>

            <tr>

              <th>S/N</th>

              <th>Student Name</th>

    `;

    subjects.forEach(
      function (subject) {

        html += `

          <th>
            ${escapeHTML(
              subject.name
            )}
          </th>

        `;

      }
    );

    html += `

              <th>Total</th>

    `;

    if (averageEnabled) {

      html += `

              <th>Average</th>

      `;
    }

    html += `

              <th>Grade</th>

              <th>Position</th>

            </tr>

          </thead>

          <tbody>

    `;

    students.forEach(
      function (student, index) {

        if (!student.marks) {
          student.marks = {};
        }

        let total = 0;

        let count = 0;

        subjects.forEach(
          function (subject) {

            const mark =
              Number(
                student.marks[
                  subject.id
                ]
              );

            if (
              Number.isFinite(mark)
            ) {

              total += mark;

              count++;
            }

          }
        );

        student.total =
          total;

        student.average =
          count > 0
            ? total / count
            : 0;

        const grade =
          count > 0
            ? getGrade(
                student.average
              )
            : "—";

        html += `

          <tr
            data-student-id="${escapeHTML(
              student.id
            )}"
          >

            <td>
              <strong>
                ${index + 1}
              </strong>
            </td>

            <td>

              <strong>
                ${escapeHTML(
                  student.name
                )}
              </strong>

            </td>

        `;

        subjects.forEach(
          function (subject) {

            const raw =
              student.marks[
                subject.id
              ];

            const value =
              raw === undefined ||
              raw === ""
                ? ""
                : Number(raw);

            html += `

              <td>

                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  class="mark-input"
                  data-student-id="${escapeHTML(
                    student.id
                  )}"
                  data-subject-id="${escapeHTML(
                    subject.id
                  )}"
                  value="${value === "" ? "" : value}"
                  placeholder="0"
                >

              </td>

            `;
          }
        );

        html += `

            <td
              class="student-total"
            >
              ${total}
            </td>

        `;

        if (averageEnabled) {

          html += `

            <td
              class="student-average"
            >
              ${
                count > 0
                  ? student.average.toFixed(2)
                  : "0.00"
              }
            </td>

          `;
        }

        html += `

            <td
              class="student-grade"
            >
              ${grade}
            </td>

            <td
              class="student-position"
            >
              ${
                positionDone &&
                student.position
                  ? ordinal(
                      student.position
                    )
                  : "—"
              }
            </td>

          </tr>

        `;
      }
    );

    html += `

          </tbody>

        </table>

      </div>

    `;

    reportPreview.innerHTML =
      html;

    bindMarkInputs();
  }

/* =========================================================
     BIND MARK INPUTS
  ========================================================= */

  function bindMarkInputs() {

    document
      .querySelectorAll(
        ".mark-input"
      )
      .forEach(
        function (input) {

          input.addEventListener(
            "input",
            function () {

              handleMarkInput(
                input.dataset.studentId,
                input.dataset.subjectId,
                input.value
              );

            }
          );

          input.addEventListener(
            "blur",
            function () {

              let value =
                input.value;

              if (value === "") {
                return;
              }

              let number =
                Number(value);

              if (
                !Number.isFinite(
                  number
                )
              ) {

                number = 0;
              }

              if (number < 0) {
                number = 0;
              }

              if (number > 100) {
                number = 100;
              }

              input.value =
                number;

              handleMarkInput(
                input.dataset.studentId,
                input.dataset.subjectId,
                number
              );

            }
          );

        }
      );
  }


  /* =========================================================
     DOWNLOAD MENU
  ========================================================= */

  function openDownloadMenu() {

    const old =
      document.getElementById(
        "downloadChoiceModal"
      );

    if (old) {
      old.remove();
    }

    if (
      students.length === 0 ||
      subjects.length === 0
    ) {

      showMessage(
        "Report Not Ready",
        "Please add students and subjects first.",
        "warning"
      );

      return;
    }

    const modal =
      document.createElement("div");

    modal.id =
      "downloadChoiceModal";

    modal.className =
      "modal";

    modal.innerHTML = `

      <div
        class="modal-content"
        style="max-width:520px;"
      >

        <div class="modal-header">

          <h3>
            Download Report
          </h3>

          <button
            type="button"
            class="modal-close"
            id="downloadClose"
          >
            ×
          </button>

        </div>

        <p
          style="
            margin-top:0;
            line-height:1.6;
          "
        >
          Choose the type of report you want to download.
        </p>

        <div
          style="
            display:grid;
            gap:12px;
          "
        >

          <button
            type="button"
            class="btn btn-primary"
            id="downloadClassReport"
            style="
              padding:16px;
              text-align:left;
            "
          >

            📄
            <strong>
              Download Class Report
            </strong>

            <br>

            <small>
              A4 landscape class result sheet.
            </small>

          </button>


          <button
            type="button"
            class="btn btn-success"
            id="downloadStudentReport"
            style="
              padding:16px;
              text-align:left;
            "
          >

            👤
            <strong>
              Download Student Report
            </strong>

            <br>

            <small>
              Individual report for each student.
            </small>

          </button>

        </div>

      </div>

    `;

    document.body.appendChild(
      modal
    );

    document
      .getElementById(
        "downloadClose"
      )
      ?.addEventListener(
        "click",
        function () {
          modal.remove();
        }
      );

    document
      .getElementById(
        "downloadClassReport"
      )
      ?.addEventListener(
        "click",
        function () {

          modal.remove();

          downloadClassReport();

        }
      );

    document
      .getElementById(
        "downloadStudentReport"
      )
      ?.addEventListener(
        "click",
        function () {

          modal.remove();

          openStudentReportChoice();

        }
      );
  }


  /* =========================================================
     CLASS REPORT
  ========================================================= */

  function downloadClassReport() {

    if (
      students.length === 0 ||
      subjects.length === 0
    ) {

      showMessage(
        "Report Not Ready",
        "Please add students and subjects first.",
        "warning"
      );

      return;
    }

    if (!calculationDone) {

      showMessage(
        "Calculate First",
        "Please calculate the results before downloading the class report.",
        "warning"
      );

      return;
    }

    const sorted =
      [...students].sort(
        function (a, b) {

          return Number(
            a.position || 999999
          ) -
          Number(
            b.position || 999999
          );

        }
      );

    let rows = "";

    sorted.forEach(
      function (student, index) {

        rows += `

          <tr>

            <td>
              ${index + 1}
            </td>

            <td>
              ${escapeHTML(
                student.name
              )}
            </td>

        `;

        subjects.forEach(
          function (subject) {

            rows += `

              <td>
                ${
                  student.marks?.[
                    subject.id
                  ] ?? 0
                }
              </td>

            `;

          }
        );

        rows += `

            <td>
              ${Number(
                student.total || 0
              )}
            </td>

            <td>
              ${
                averageEnabled
                  ? Number(
                      student.average || 0
                    ).toFixed(2)
                  : "—"
              }
            </td>

            <td>
              ${
                student.position
                  ? ordinal(
                      student.position
                    )
                  : "—"
              }
            </td>

          </tr>

        `;
      }
    );

    const html =
      printableDocument(
        "Class Report",
        "landscape",
        `

          <div class="print-header">

            ${
              settings.logo
                ? `
                  <img
                    src="${settings.logo}"
                    class="school-logo"
                  >
                `
                : ""
            }

            <h1>
              ${escapeHTML(
                settings.schoolName ||
                "MY SCHOOL"
              )}
            </h1>

            ${
              settings.schoolAddress
                ? `
                  <p>
                    ${escapeHTML(
                      settings.schoolAddress
                    )}
                  </p>
                `
                : ""
            }

            <h2>
              CLASS RESULT REPORT
            </h2>

            <div class="meta">

              <span>
                Class:
                <strong>
                  ${escapeHTML(
                    settings.className ||
                    "—"
                  )}
                </strong>
              </span>

              <span>
                Session:
                <strong>
                  ${escapeHTML(
                    settings.session ||
                    "—"
                  )}
                </strong>
              </span>

              <span>
                Term:
                <strong>
                  ${escapeHTML(
                    settings.term ||
                    "First Term"
                  )}
                </strong>
              </span>

              <span>
                Teacher:
                <strong>
                  ${escapeHTML(
                    settings.teacherName ||
                    "—"
                  )}
                </strong>
              </span>

            </div>

          </div>

          <table class="print-table">

            <thead>

              <tr>

                <th>S/N</th>

                <th>Student Name</th>

                ${subjects
                  .map(
                    function (subject) {

                      return `
                        <th>
                          ${escapeHTML(
                            subject.name
                          )}
                        </th>
                      `;

                    }
                  )
                  .join("")}

                <th>Total</th>

                ${
                  averageEnabled
                    ? "<th>Average</th>"
                    : ""
                }

                <th>Position</th>

              </tr>

            </thead>

            <tbody>

              ${rows}

            </tbody>

          </table>

          <div class="print-footer">

            <div>
              Class Teacher:
              ${escapeHTML(
                settings.teacherName ||
                ""
              )}
            </div>

            <div>
              Principal / Headmaster:
              __________________
            </div>

          </div>

        `
      );

    openPrintWindow(
      html,
      "Class Report"
    );
}


  /* =========================================================
     STUDENT REPORT CHOICE
  ========================================================= */

  function openStudentReportChoice() {

    const old =
      document.getElementById(
        "studentReportChoice"
      );

    if (old) {
      old.remove();
    }

    const modal =
      document.createElement("div");

    modal.id =
      "studentReportChoice";

    modal.className =
      "modal";

    let options = "";

    students.forEach(
      function (student) {

        options += `

          <option
            value="${escapeHTML(
              student.id
            )}"
          >
            ${escapeHTML(
              student.name
            )}
          </option>

        `;

      }
    );

    modal.innerHTML = `

      <div
        class="modal-content"
        style="max-width:500px;"
      >

        <div class="modal-header">

          <h3>
            Student Report
          </h3>

          <button
            type="button"
            class="modal-close"
            id="studentChoiceClose"
          >
            ×
          </button>

        </div>

        <div class="form-group">

          <label>
            Select Student
          </label>

          <select
            id="studentReportSelect"
            class="form-control"
          >

            ${options}

          </select>

        </div>

        <div
          style="
            display:flex;
            gap:10px;
          "
        >

          <button
            type="button"
            class="btn btn-light"
            id="studentChoiceCancel"
            style="flex:1;"
          >
            Cancel
          </button>

          <button
            type="button"
            class="btn btn-success"
            id="studentChoicePrint"
            style="flex:1;"
          >
            Download
          </button>

        </div>

      </div>

    `;

    document.body.appendChild(
      modal
    );

    function close() {
      modal.remove();
    }

    document
      .getElementById(
        "studentChoiceClose"
      )
      ?.addEventListener(
        "click",
        close
      );

    document
      .getElementById(
        "studentChoiceCancel"
      )
      ?.addEventListener(
        "click",
        close
      );

    document
      .getElementById(
        "studentChoicePrint"
      )
      ?.addEventListener(
        "click",
        function () {

          const select =
            document.getElementById(
              "studentReportSelect"
            );

          const student =
            students.find(
              function (item) {

                return String(
                  item.id
                ) ===
                String(
                  select.value
                );

              }
            );

          close();

          if (student) {
            downloadIndividualReport(
              student
            );
          }

        }
      );
  }


  /* =========================================================
     INDIVIDUAL REPORT
  ========================================================= */

  function downloadIndividualReport(
    student
  ) {

    if (!student) {
      return;
    }

    if (!calculationDone) {

      showMessage(
        "Calculate First",
        "Please calculate the results before downloading the student report.",
        "warning"
      );

      return;
    }

    let total =
      Number(
        student.total || 0
      );

    let count = 0;

    subjects.forEach(
      function (subject) {

        const mark =
          Number(
            student.marks?.[
              subject.id
            ]
          );

        if (
          Number.isFinite(mark)
        ) {
          count++;
        }

      }
    );

    const average =
      count > 0
        ? total / count
        : 0;

    let rows = "";

    subjects.forEach(
      function (subject, index) {

        const score =
          Number(
            student.marks?.[
              subject.id
            ]
          ) || 0;

        rows += `

          <tr>

            <td>
              ${index + 1}
            </td>

            <td>
              ${escapeHTML(
                subject.name
              )}
            </td>

            <td>
              100
            </td>

            <td>
              ${score}
            </td>

            <td>
              ${getGrade(
                score
              )}
            </td>

            <td>
              ${getGradeRemark(
                score
              )}
            </td>

          </tr>

        `;
      }
    );

    const html =
      printableDocument(
        "Student Report",
        "portrait",
        `

          <div class="individual-header">

            ${
              settings.logo
                ? `
                  <img
                    src="${settings.logo}"
                    class="school-logo individual-logo"
                  >
                `
                : ""
            }

            <h1>
              ${escapeHTML(
                settings.schoolName ||
                "MY SCHOOL"
              )}
            </h1>

            ${
              settings.schoolAddress
                ? `
                  <p>
                    ${escapeHTML(
                      settings.schoolAddress
                    )}
                  </p>
                `
                : ""
            }

            <h2>
              STUDENT REPORT SHEET
            </h2>

          </div>


          <div class="student-information">

            <div>
              <strong>
                STUDENT NAME:
              </strong>

              <span>
                ${escapeHTML(
                  student.name
                )}
              </span>
            </div>

            <div>
              <strong>
                STUDENT NO:
              </strong>

              <span>
                ${students.indexOf(
                  student
                ) + 1}
              </span>
            </div>

            <div>
              <strong>
                CLASS:
              </strong>

              <span>
                ${escapeHTML(
                  settings.className ||
                  "—"
                )}
              </span>
            </div>

            <div>
              <strong>
                SESSION:
              </strong>

              <span>
                ${escapeHTML(
                  settings.session ||
                  "—"
                )}
              </span>
            </div>

            <div>
              <strong>
                TERM:
              </strong>

              <span>
                ${escapeHTML(
                  settings.term ||
                  "First Term"
                )}
              </span>
            </div>

            <div>
              <strong>
                CLASS TEACHER:
              </strong>

              <span>
                ${escapeHTML(
                  settings.teacherName ||
                  "—"
                )}
              </span>
            </div>

          </div>


          <table class="print-table individual-table">

            <thead>

              <tr>

                <th>S/N</th>

                <th>SUBJECT</th>

                <th>MAXIMUM MARK</th>

                <th>SCORE</th>

                <th>GRADE</th>

                <th>REMARK</th>

              </tr>

            </thead>

            <tbody>

              ${rows}

            </tbody>

          </table>


          <div class="summary-grid">

            <div class="summary-box">

              <strong>
                TOTAL MARKS
              </strong>

              <span>
                ${total}
                /
                ${subjects.length * 100}
              </span>

            </div>


            <div class="summary-box">

              <strong>
                AVERAGE
              </strong>

              <span>
                ${average.toFixed(2)}
              </span>

            </div>


            <div class="summary-box">

              <strong>
                POSITION
              </strong>

              <span>
                ${
                  student.position
                    ? ordinal(
                        student.position
                      )
                    : "—"
                }
              </span>

            </div>

          </div>


          <div class="grade-legend">

            <h3>
              GRADE LEGEND
            </h3>

            <div>
              80 – 100 &nbsp; A &nbsp; Excellent
            </div>

            <div>
              70 – 79 &nbsp; B &nbsp; Very Good
            </div>

            <div>
              60 – 69 &nbsp; C &nbsp; Good
            </div>

            <div>
              50 – 59 &nbsp; D &nbsp; Fair
            </div>

            <div>
              0 – 49 &nbsp; E &nbsp; Poor
            </div>

          </div>


          <div class="remarks">

            <strong>
              CLASS TEACHER REMARK:
            </strong>

            <div class="remark-line"></div>

            <div class="remark-line"></div>

            <br>

            <strong>
              PRINCIPAL / HEADMASTER REMARK:
            </strong>

            <div class="remark-line"></div>

            <div class="remark-line"></div>

          </div>


          <div class="signature-row">

            <div>
              __________________________
              <br>
              Class Teacher
            </div>

            <div>
              __________________________
              <br>
              Principal / Headmaster
            </div>

          </div>


          <div class="print-note">

            ${
              escapeHTML(
                settings.schoolName ||
                "My School"
              )
            }
            —
            Student Result Management System

          </div>

        `
      );

    openPrintWindow(
      html,
      "Student Report - " +
      student.name
    );
  }


  /* =========================================================
     PRINT DOCUMENT
  ========================================================= */

  function printableDocument(
    title,
    orientation,
    content
  ) {

    return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
>

<title>
  ${escapeHTML(title)}
</title>

<style>

@page {

  size:
    A4
    ${orientation};

  margin:
    8mm;

}

* {

  box-sizing:
    border-box;

}

html,
body {

  margin:
    0;

  padding:
    0;

  background:
    white;

  color:
    #111;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

}

body {

  padding:
    8mm;

}

.print-header,
.individual-header {

  text-align:
    center;

  border-bottom:
    3px solid
    #075c38;

  padding-bottom:
    8px;

  margin-bottom:
    12px;

}

.print-header h1,
.individual-header h1 {

  margin:
    0;

  font-size:
    24px;

  color:
    #075c38;

}

.print-header h2,
.individual-header h2 {

  display:
    inline-block;

  margin:
    7px 0 0;

  padding:
    6px 35px;

  background:
    #075c38;

  color:
    white;

  font-size:
    16px;

}

.print-header p,
.individual-header p {

  margin:
    4px 0;

  font-size:
    12px;

}

.school-logo {

  width:
    55px;

  height:
    55px;

  object-fit:
    contain;

  display:
    block;

  margin:
    0 auto 5px;

}

.individual-logo {

  width:
    65px;

  height:
    65px;

}

.meta {

  display:
    flex;

  justify-content:
    space-between;

  gap:
    8px;

  margin-top:
    8px;

  font-size:
    10px;

}

.print-table {

  width:
    100%;

  border-collapse:
    collapse;

  table-layout:
    fixed;

}

.print-table th {

  background:
    #075c38;

  color:
    white;

  font-size:
    10px;

  padding:
    6px 3px;

  border:
    1px solid
    #555;

}

.print-table td {

  font-size:
    10px;

  padding:
    5px 3px;

  border:
    1px solid
    #777;

  text-align:
    center;

}

.print-table td:nth-child(2) {

  text-align:
    left;

}

.student-information {

  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  gap:
    5px 20px;

  border:
    1px solid
    #777;

  padding:
    10px;

  margin-bottom:
    12px;

  font-size:
    11px;

}

.student-information div {

  display:
    flex;

  gap:
    7px;

}

.student-information strong {

  min-width:
    105px;

}

.summary-grid {

  display:
    grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap:
    8px;

  margin-top:
    12px;

}

.summary-box {

  border:
    1.5px solid
    #075c38;

  padding:
    10px;

  text-align:
    center;

}

.summary-box strong {

  display:
    block;

  font-size:
    11px;

}

.summary-box span {

  display:
    block;

  margin-top:
    5px;

  font-size:
    16px;

  font-weight:
    bold;

  color:
    #075c38;

}

.grade-legend {

  margin-top:
    15px;

  width:
    48%;

  font-size:
    10px;

}

.grade-legend h3 {

  margin:
    0 0 5px;

  font-size:
    12px;
}

.remarks {

  margin-top:
    15px;

  font-size:
    10px;

}

.remark-line {

  border-bottom:
    1px dotted
    #555;

  height:
    17px;

}

.signature-row {

  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  gap:
    30px;

  text-align:
    center;

  margin-top:
    25px;

  font-size:
    10px;

}

.print-footer {

  display:
    flex;

  justify-content:
    space-between;

  margin-top:
    20px;

  font-size:
    10px;

}

.print-note {

  text-align:
    center;

  margin-top:
    15px;

  font-size:
    8px;

  color:
    #555;

}

@media print {

  body {

    padding:
      0;

  }

}

</style>

</head>

<body>

${content}

</body>

</html>

    `;
  }


  /* =========================================================
     OPEN PRINT WINDOW
  ========================================================= */

  function openPrintWindow(
    html,
    title
  ) {

    const win =
      window.open(
        "",
        "_blank",
        "width=1200,height=850"
      );

    if (!win) {

      showMessage(
        "Popup Blocked",
        "Please allow pop-ups for this website, then try again.",
        "warning"
      );

      return;
    }

    win.document.open();

    win.document.write(
      html
    );

    win.document.close();

    win.document.title =
      title;

    setTimeout(
      function () {

        win.focus();

        win.print();

      },
      700
    );
  }


  /* =========================================================
     PRINT CURRENT REPORT
  ========================================================= */

  function printReport() {

    if (
      students.length === 0 ||
      subjects.length === 0
    ) {

      showMessage(
        "Report Not Ready",
        "Please add students and subjects first.",
        "warning"
      );

      return;
    }

    if (!calculationDone) {

      showMessage(
        "Calculate First",
        "Please calculate the results before printing.",
        "warning"
      );

      return;
    }

    downloadClassReport();
  }


  /* =========================================================
     CLEAR DATA
  ========================================================= */

  function clearAllData() {

    customConfirm(
      "Clear All Data",
      `
        Are you sure you want to clear
        all student and subject data?

        <br><br>

        <strong>
          School setup will remain saved.
        </strong>

        <br><br>

        This action cannot be undone.
      `,
      "Clear Data",
      function () {

        students = [];

        subjects = [];

        calculationDone = false;

        positionDone = false;

        saveData();

        updateDashboard();

        renderReport();

        showMessage(
          "Data Cleared",
          "All student and subject data has been removed.",
          "success"
        );

      }
    );
  }


  /* =========================================================
     SETUP MODAL
  ========================================================= */

  function openSetupModal() {

    closeMenu();

    const old =
      document.getElementById(
        "mySetupModal"
      );

    if (old) {
      old.remove();
    }

    const modal =
      document.createElement("div");

    modal.id =
      "mySetupModal";

    modal.className =
      "modal";

    modal.innerHTML = `

      <div
        class="modal-content"
        style="
          max-width:560px;
          max-height:90vh;
          overflow-y:auto;
        "
      >

        <div class="modal-header">

          <h3>
            School Setup
          </h3>

          <button
            type="button"
            class="modal-close"
            id="setupClose"
          >
            ×
          </button>

        </div>


        <div class="form-group">

          <label>
            School Name
          </label>

          <input
            type="text"
            id="setupSchoolName"
            class="form-control"
            value="${escapeHTML(
              settings.schoolName
            )}"
            placeholder="Enter school name"
          >

        </div>


        <div class="form-group">

          <label>
            School Address
          </label>

          <input
            type="text"
            id="setupSchoolAddress"
            class="form-control"
            value="${escapeHTML(
              settings.schoolAddress
            )}"
            placeholder="Enter school address"
          >

        </div>


        <div class="form-group">

          <label>
            Teacher Name
          </label>

          <input
            type="text"
            id="setupTeacherName"
            class="form-control"
            value="${escapeHTML(
              settings.teacherName
            )}"
            placeholder="Enter teacher name"
          >

        </div>


        <div class="form-group">

          <label>
            Class
          </label>

          <select
            id="setupClass"
            class="form-control"
          >

            <option value="">
              Select Class
            </option>

            <option
              ${settings.className === "Pre-Nursery"
                ? "selected"
                : ""}
            >
              Pre-Nursery
            </option>

            <option
              ${settings.className === "Nursery 1"
                ? "selected"
                : ""}
            >
              Nursery 1
            </option>

            <option
              ${settings.className === "Nursery 2"
                ? "selected"
                : ""}
            >
              Nursery 2
            </option>

            <option
              ${settings.className === "Nursery 3"
                ? "selected"
                : ""}
            >
              Nursery 3
            </option>

            <option
              ${settings.className === "Primary 1"
                ? "selected"
                : ""}
            >
              Primary 1
            </option>

            <option
              ${settings.className === "Primary 2"
                ? "selected"
                : ""}
            >
              Primary 2
            </option>

            <option
              ${settings.className === "Primary 3"
                ? "selected"
                : ""}
            >
              Primary 3
            </option>

            <option
              ${settings.className === "Primary 4"
                ? "selected"
                : ""}
            >
              Primary 4
            </option>

            <option
              ${settings.className === "Primary 5"
                ? "selected"
                : ""}
            >
              Primary 5
            </option>

            <option
              ${settings.className === "Primary 6"
                ? "selected"
                : ""}
            >
              Primary 6
            </option>

            <option
              ${settings.className === "JSS 1"
                ? "selected"
                : ""}
            >
              JSS 1
            </option>

            <option
              ${settings.className === "JSS 2"
                ? "selected"
                : ""}
            >
              JSS 2
            </option>

            <option
              ${settings.className === "JSS 3"
                ? "selected"
                : ""}
            >
              JSS 3
            </option>

            <option
              ${settings.className === "SSS 1"
                ? "selected"
                : ""}
            >
              SSS 1
            </option>

            <option
              ${settings.className === "SSS 2"
                ? "selected"
                : ""}
            >
              SSS 2
            </option>

            <option
              ${settings.className === "SSS 3"
                ? "selected"
                : ""}
            >
              SSS 3
            </option>

          </select>

        </div>


        <div class="form-group">

          <label>
            Session
          </label>
<input
            type="text"
            id="setupSession"
            class="form-control"
            value="${escapeHTML(
              settings.session
            )}"
            placeholder="Example: 2025/2026"
          >

        </div>


        <div class="form-group">

          <label>
            Term
          </label>

          <select
            id="setupTerm"
            class="form-control"
          >

            <option
              ${
                settings.term ===
                "First Term"
                  ? "selected"
                  : ""
              }
            >
              First Term
            </option>

            <option
              ${
                settings.term ===
                "Second Term"
                  ? "selected"
                  : ""
              }
            >
              Second Term
            </option>

            <option
              ${
                settings.term ===
                "Third Term"
                  ? "selected"
                  : ""
              }
            >
              Third Term
            </option>

          </select>

        </div>


        <div class="form-group">

          <label>
            Add Logo
          </label>

          <input
            type="file"
            id="setupLogo"
            class="form-control"
            accept="image/png,image/jpeg,image/jpg,image/webp"
          >

          <small>
            School logo will appear on student reports.
          </small>

          <div
            id="logoPreview"
            style="
              margin-top:10px;
              text-align:center;
            "
          >

            ${
              settings.logo
                ? `
                  <img
                    src="${settings.logo}"
                    alt="School Logo"
                    style="
                      width:80px;
                      height:80px;
                      object-fit:contain;
                    "
                  >
                `
                : ""
            }

          </div>

        </div>


        <div
          style="
            display:flex;
            gap:10px;
            margin-top:20px;
          "
        >

          <button
            type="button"
            class="btn btn-light"
            id="setupCancel"
            style="flex:1"
          >
            Cancel
          </button>

          <button
            type="button"
            class="btn btn-primary"
            id="setupSave"
            style="flex:1"
          >
            Save Setup
          </button>

        </div>

      </div>

    `;

    document.body.appendChild(
      modal
    );

    const close =
      document.getElementById(
        "setupClose"
      );

    const cancel =
      document.getElementById(
        "setupCancel"
      );

    const save =
      document.getElementById(
        "setupSave"
      );

    const logo =
      document.getElementById(
        "setupLogo"
      );

    const preview =
      document.getElementById(
        "logoPreview"
      );

    function closeSetup() {

      modal.remove();
    }

    close?.addEventListener(
      "click",
      closeSetup
    );

    cancel?.addEventListener(
      "click",
      closeSetup
    );

    logo?.addEventListener(
      "change",
      function () {

        const file =
          logo.files[0];

        if (!file) {
          return;
        }

        if (
          file.size >
          2 * 1024 * 1024
        ) {

          showMessage(
            "Logo Too Large",
            "Maximum logo size is 2MB.",
            "warning"
          );

          logo.value = "";

          return;
        }

        const reader =
          new FileReader();

        reader.onload =
          function (event) {

            preview.innerHTML = `

              <img
                src="${event.target.result}"
                alt="School Logo"
                style="
                  width:80px;
                  height:80px;
                  object-fit:contain;
                "
              >

            `;

          };

        reader.readAsDataURL(
          file
        );
      }
    );

    save?.addEventListener(
      "click",
      function () {

        const schoolName =
          document
            .getElementById(
              "setupSchoolName"
            )
            .value
            .trim();

        const schoolAddress =
          document
            .getElementById(
              "setupSchoolAddress"
            )
            .value
            .trim();

        const teacherName =
          document
            .getElementById(
              "setupTeacherName"
            )
            .value
            .trim();

        const className =
          document
            .getElementById(
              "setupClass"
            )
            .value;

        const session =
          document
            .getElementById(
              "setupSession"
            )
            .value
            .trim();

        const term =
          document
            .getElementById(
              "setupTerm"
            )
            .value;

        if (!schoolName) {

          showMessage(
            "School Name Required",
            "Please enter the school name.",
            "warning"
          );

          return;
        }

        if (!teacherName) {

          showMessage(
            "Teacher Name Required",
            "Please enter the teacher name.",
            "warning"
          );

          return;
        }

        if (!className) {

          showMessage(
            "Class Required",
            "Please select the class.",
            "warning"
          );

          return;
        }

        settings.schoolName =
          schoolName;

        settings.schoolAddress =
          schoolAddress;

        settings.teacherName =
          teacherName;

        settings.className =
          className;

        settings.session =
          session;

        settings.term =
          term;

        const file =
          logo.files[0];

        if (file) {

          const reader =
            new FileReader();

          reader.onload =
            function (event) {

              settings.logo =
                event.target.result;

              saveData();

              closeSetup();

              showMessage(
                "Setup Saved",
                "School setup has been saved successfully.",
                "success"
              );

              renderReport();
            };

          reader.readAsDataURL(
            file
          );

        } else {

          saveData();

          closeSetup();

          showMessage(
            "Setup Saved",
            "School setup has been saved successfully.",
            "success"
          );

          renderReport();
        }

      }
    );
  }


  /* =========================================================
     MENU ACTIONS
  ========================================================= */

  function setupMenuButton(
    id,
    callback
  ) {

    const button =
      document.getElementById(id);

    if (!button) {
      return;
    }

    button.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        activateMenu(id);

        callback();

      }
    );
  }


  setupMenuButton(
    "dashboardMenu",
    function () {

      closeMenu();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  setupMenuButton(
    "studentsMenu",
    function () {

      closeMenu();

      addStudent();

    }
  );


  setupMenuButton(
    "subjectsMenu",
    function () {

      closeMenu();

      addSubject();

    }
  );


  setupMenuButton(
    "resultsMenu",
    function () {

      closeMenu();

      const section =
        document.getElementById(
          "reportSection"
        );

      section?.scrollIntoView({
        behavior: "smooth"
      });

    }
  );


  setupMenuButton(
    "averageMenu",
    function () {

      closeMenu();

      toggleAverage();

    }
  );


  setupMenuButton(
    "positionMenu",
    function () {

      closeMenu();

      makePosition();

    }
  );


  setupMenuButton(
    "settingsMenu",
    function () {

      openSetupModal();

    }
  );


  /* =========================================================
     LOGOUT
  ========================================================= */

  const logoutBtn =
    document.getElementById(
      "logoutBtn"
    );

  if (logoutBtn) {

    logoutBtn.addEventListener(
      "click",
      function () {

        closeMenu();

        customConfirm(
          "Logout",
          `
            Are you sure you want to logout?

            <br><br>

            Your saved school and student
            data will remain on this device.
          `,
          "Logout",
          function () {

            showMessage(
              "Logged Out",
              "You have been logged out successfully.",
              "info"
            );

          }
        );

      }
    );
  }


  /* =========================================================
     QUICK BUTTONS
  ========================================================= */

  addStudentBtn?.addEventListener(
    "click",
    addStudent
  );

  addSubjectBtn?.addEventListener(
    "click",
    addSubject
  );

  calculateBtn?.addEventListener(
    "click",
    calculateMarks
  );

  positionBtn?.addEventListener(
    "click",
    makePosition
  );

  printReportBtn?.addEventListener(
    "click",
    printReport
  );

  downloadPdfBtn?.addEventListener(
    "click",
    openDownloadMenu
  );

  clearDataBtn?.addEventListener(
    "click",
    clearAllData
  );


  /* =========================================================
     START APPLICATION
  ========================================================= */

  ensureAverageButton();

  updateGreeting();

  updateDashboard();

  renderReport();

  saveData();


  /* =========================================================
     UPDATE GREETING AUTOMATICALLY
  ========================================================= */

  setInterval(
    updateGreeting,
    60 * 1000
  );

});
