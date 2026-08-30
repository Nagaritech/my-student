"use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     MY STUDENT — COMPLETE APP.JS
     ========================================================= */

  /* =========================================================
     DATA
     ========================================================= */

  let students =
    JSON.parse(localStorage.getItem("myStudents") || "[]");

  let subjects =
    JSON.parse(localStorage.getItem("mySubjects") || "[]");

  let calculationDone =
    localStorage.getItem("calculationDone") === "true";

  let positionDone =
    localStorage.getItem("positionDone") === "true";

  let averageEnabled =
    localStorage.getItem("averageEnabled") === "true";

  let schoolName =
    localStorage.getItem("schoolName") || "My School";

  let schoolLogo =
    localStorage.getItem("schoolLogo") || "";


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const menuToggle =
    document.getElementById("menuToggle");

  const sideMenu =
    document.getElementById("sideMenu");

  const sideMenuClose =
    document.getElementById("sideMenuClose");

  const menuOverlay =
    document.getElementById("menuOverlay");

  const dashboardMenu =
    document.getElementById("dashboardMenu");

  const studentsMenu =
    document.getElementById("studentsMenu");

  const subjectsMenu =
    document.getElementById("subjectsMenu");

  const resultsMenu =
    document.getElementById("resultsMenu");

  const averageMenu =
    document.getElementById("averageMenu");

  const positionMenu =
    document.getElementById("positionMenu");

  const settingsMenu =
    document.getElementById("settingsMenu");

  const logoutBtn =
    document.getElementById("logoutBtn");

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

  const addAverageBtn =
    document.getElementById("addAverageBtn");

  const reportPreview =
    document.getElementById("reportPreview");

  const printReportBtn =
    document.getElementById("printReportBtn");

  const downloadPdfBtn =
    document.getElementById("downloadPdfBtn");

  const clearDataBtn =
    document.getElementById("clearDataBtn");
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

    localStorage.setItem(
      "schoolName",
      schoolName
    );

    localStorage.setItem(
      "schoolLogo",
      schoolLogo
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
     ORDINAL POSITION
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

    updateAverageButton();
  }


  /* =========================================================
     MESSAGE
     ========================================================= */

  function showActionMessage(
    title,
    message,
    type = "success"
  ) {

    const quickCard =
      document.querySelector(
        ".quick-actions-card"
      );

    if (!quickCard) {
      return;
    }

    let box =
      document.getElementById(
        "quickActionMessage"
      );

    if (!box) {

      box =
        document.createElement("div");

      box.id =
        "quickActionMessage";

      box.className =
        "quick-action-message-container";

      quickCard.appendChild(box);
    }

    let icon = "✓";

    if (type === "warning") {
      icon = "⚠️";
    }

    if (type === "loading") {
      icon = "⏳";
    }

    if (type === "info") {
      icon = "ℹ️";
    }

    box.innerHTML = `

      <div class="quick-action-message ${type}">

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

      </div>

    `;

    if (type !== "loading") {

      setTimeout(function () {

        if (box) {
          box.innerHTML = "";
        }

      }, 4000);
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
      menuOverlay.classList.add("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-expanded",
        "true"
      );
    }
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
      menuOverlay.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  }


  if (menuToggle) {
    menuToggle.addEventListener(
      "click",
      openMenu
    );
  }


  if (sideMenuClose) {
    sideMenuClose.addEventListener(
      "click",
      closeMenu
    );
  }


  if (menuOverlay) {
    menuOverlay.addEventListener(
      "click",
      closeMenu
    );
                          }

  /* =========================================================
     MENU NAVIGATION
     ========================================================= */

  function scrollToElement(id) {

    closeMenu();

    const element =
      document.getElementById(id);

    if (element) {

      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }


  if (dashboardMenu) {

    dashboardMenu.addEventListener(
      "click",
      function () {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );
  }


  if (studentsMenu) {

    studentsMenu.addEventListener(
      "click",
      function () {

        closeMenu();

        if (addStudentBtn) {
          addStudentBtn.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }

      }
    );
  }


  if (subjectsMenu) {

    subjectsMenu.addEventListener(
      "click",
      function () {

        closeMenu();

        if (addSubjectBtn) {
          addSubjectBtn.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }

      }
    );
  }


  if (resultsMenu) {

    resultsMenu.addEventListener(
      "click",
      function () {
        scrollToElement(
          "reportSection"
        );
      }
    );
  }


  if (averageMenu) {

    averageMenu.addEventListener(
      "click",
      function () {

        closeMenu();

        toggleAverage();

      }
    );
  }


  if (positionMenu) {

    positionMenu.addEventListener(
      "click",
      function () {

        closeMenu();

        makePosition();

      }
    );
  }


  if (settingsMenu) {

    settingsMenu.addEventListener(
      "click",
      function () {

        closeMenu();

        openSettings();

      }
    );
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

    const oldModal =
      document.getElementById(
        "myStudentInputModal"
      );

    if (oldModal) {
      oldModal.remove();
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
            id="closeInputModal"
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
            id="cancelInputModal"
            style="flex:1;"
          >
            Cancel
          </button>

          <button
            type="button"
            class="btn btn-primary"
            id="saveInputModal"
            style="flex:1;"
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

    const closeBtn =
      document.getElementById(
        "closeInputModal"
      );

    const cancelBtn =
      document.getElementById(
        "cancelInputModal"
      );

    const saveBtn =
      document.getElementById(
        "saveInputModal"
      );


    function closeModal() {

      if (
        modal &&
        modal.parentNode
      ) {
        modal.remove();
      }
    }


    if (closeBtn) {

      closeBtn.addEventListener(
        "click",
        closeModal
      );
    }


    if (cancelBtn) {

      cancelBtn.addEventListener(
        "click",
        closeModal
      );
    }


    if (saveBtn) {

      saveBtn.addEventListener(
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
    }


    if (input) {

      input.addEventListener(
        "keydown",
        function (event) {

          if (event.key === "Enter") {

            event.preventDefault();

            if (saveBtn) {
              saveBtn.click();
            }
          }

          if (event.key === "Escape") {

            event.preventDefault();

            closeModal();
          }

        }
      );
    }


    setTimeout(function () {

      if (input) {
        input.focus();
      }

    }, 100);
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
                student.name || ""
              ).toLowerCase() ===
              name.toLowerCase();

            }
          );


        if (exists) {

          showActionMessage(
            "Student Already Exists",
            escapeHTML(name),
            "warning"
          );

          return;
        }


        students.push({

          id:
            Date.now() +
            "-" +
            Math.random()
              .toString(36)
              .substring(2),

          name:
            name,

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


        showActionMessage(
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


  if (addStudentBtn) {

    addStudentBtn.addEventListener(
      "click",
      addStudent
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
                subject.name || ""
              ).toLowerCase() ===
              name.toLowerCase();

            }
          );


        if (exists) {

          showActionMessage(
            "Subject Already Exists",
            escapeHTML(name),
            "warning"
          );

          return;
        }


        subjects.push({

          id:
            Date.now() +
            "-" +
            Math.random()
              .toString(36)
              .substring(2),

          name:
            name

        });


        calculationDone = false;

        positionDone = false;


        saveData();

        updateDashboard();

        renderReport();


        showActionMessage(
          "Subject Added Successfully",
          escapeHTML(name),
          "success"
        );

      }
    );
  }


  if (addSubjectBtn) {

    addSubjectBtn.addEventListener(
      "click",
      addSubject
    );
  }


  /* =========================================================
     AVERAGE
     ========================================================= */

  function updateAverageButton() {

    if (!addAverageBtn) {
      return;
    }

    const title =
      addAverageBtn.querySelector(
        ".action-title"
      );

    if (title) {

      title.textContent =
        averageEnabled
          ? "Average: ON"
          : "Average";
    }
  }


  function toggleAverage() {

    averageEnabled =
      !averageEnabled;


    saveData();

    renderReport();

    updateDashboard();


    showActionMessage(
      averageEnabled
        ? "Average Enabled"
        : "Average Disabled",

      averageEnabled
        ? "Average will now appear in the student results."
        : "Average will not appear in the student results.",

      "info"
    );
  }


  if (addAverageBtn) {

    addAverageBtn.addEventListener(
      "click",
      toggleAverage
    );
  }


  /* =========================================================
     CALCULATE MARKS
     ========================================================= */

  function calculateMarks() {

    if (students.length === 0) {

      showActionMessage(
        "No Students Yet",
        "Please add students first.",
        "warning"
      );

      return;
    }


    if (subjects.length === 0) {

      showActionMessage(
        "No Subjects Yet",
        "Please add subjects first.",
        "warning"
      );

      return;
    }


    if (calculateBtn) {
      calculateBtn.disabled = true;
    }


    showActionMessage(
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
      "loading"
    );


    let progress = 0;


    const timer =
      setInterval(
        function () {

          progress += 5;


          const progressBar =
            document.getElementById(
              "calculationProgress"
            );


          if (progressBar) {

            progressBar.style.width =
              progress + "%";
          }


          if (progress >= 100) {

            clearInterval(timer);

            finishCalculation();

          }

        },
        80
      );
  }


  if (calculateBtn) {

    calculateBtn.addEventListener(
      "click",
      calculateMarks
    );
  }


  /* =========================================================
     FINISH CALCULATION
     ========================================================= */

  function finishCalculation() {

    students.forEach(
      function (student) {

        let total = 0;

        let count = 0;


        if (!student.marks) {
          student.marks = {};
        }


        subjects.forEach(
          function (subject) {

            const rawValue =
              student.marks[
                subject.id
              ];


            if (
              rawValue !== undefined &&
              rawValue !== ""
            ) {

              const value =
                Number(rawValue);


              if (
                Number.isFinite(value)
              ) {

                total += value;

                count++;
              }
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


    showActionMessage(
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

    if (students.length === 0) {

      showActionMessage(
        "No Students Yet",
        "Please add students first.",
        "warning"
      );

      return;
    }


    if (subjects.length === 0) {

      showActionMessage(
        "No Subjects Yet",
        "Please add subjects first.",
        "warning"
      );

      return;
    }


    if (!calculationDone) {

      showActionMessage(
        "Calculate Results First",
        "Please calculate the student results before making position.",
        "warning"
      );

      return;
    }


    if (positionBtn) {
      positionBtn.disabled = true;
    }


    showActionMessage(
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
      "loading"
    );


    let progress = 0;


    const timer =
      setInterval(
        function () {

          progress += 5;


          const progressBar =
            document.getElementById(
              "positionProgress"
            );


          if (progressBar) {

            progressBar.style.width =
              progress + "%";
          }


          if (progress >= 100) {

            clearInterval(timer);

            finishPosition();

          }

        },
        80
      );
  }


  if (positionBtn) {

    positionBtn.addEventListener(
      "click",
      makePosition
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

                return item.id ===
                  original.id;

              }
            ) || original
          );

        }
      );


    positionDone = true;


    saveData();

    updateDashboard();

    renderReport();


    showActionMessage(
      "Position Completed",
      "Student positions have been calculated successfully.",
      "success"
    );


    if (positionBtn) {
      positionBtn.disabled = false;
    }
  }


  /* =========================================================
     MARK INPUT CHANGE
     ========================================================= */

  function updateMark(
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


    if (value === "") {

      delete student.marks[
        subjectId
      ];

    } else {

      let number =
        Number(value);


      if (!Number.isFinite(number)) {
        number = 0;
      }


      if (number < 0) {
        number = 0;
      }


      if (number > 100) {
        number = 100;
      }


      student.marks[
        subjectId
      ] = number;
    }


    calculationDone = false;

    positionDone = false;


    saveData();

    updateDashboard();


    /* Keep the changed value visible
       without destroying the input. */

    updateStudentRowTotals(
      studentId
    );
  }


  function updateStudentRowTotals(
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
            student.marks &&
            student.marks[
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


    const row =
      document.querySelector(
        `tr[data-student-id="${CSS.escape(String(studentId))}"]`
      );


    if (!row) {
      return;
    }


    const totalCell =
      row.querySelector(
        ".student-total"
      );


    if (totalCell) {

      totalCell.textContent =
        total;
    }


    const averageCell =
      row.querySelector(
        ".student-average"
      );


    if (averageCell) {

      averageCell.textContent =
        student.average.toFixed(2);
    }


    const positionCell =
      row.querySelector(
        ".student-position"
      );


    if (positionCell) {

      positionCell.textContent =
        student.position
          ? ordinal(student.position)
          : "—";
    }
}
/* =========================================================
     RENDER REPORT
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
            enter their marks, then calculate.
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
            ${escapeHTML(subject.name)}
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

              <th>Position</th>

            </tr>

          </thead>

          <tbody>

    `;


    students.forEach(
      function (student, index) {

        html += `

          <tr
            data-student-id="${escapeHTML(student.id)}"
          >

            <td>
              <strong>
                ${index + 1}
              </strong>
            </td>

            <td>
              <strong>
                ${escapeHTML(student.name)}
              </strong>
            </td>

        `;


        subjects.forEach(
          function (subject) {

            const mark =
              student.marks &&
              student.marks[
                subject.id
              ] !== undefined
                ? student.marks[
                    subject.id
                  ]
                : "";


            html += `

              <td>

                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  class="mark-input"
                  data-student-id="${escapeHTML(student.id)}"
                  data-subject-id="${escapeHTML(subject.id)}"
                  value="${escapeHTML(mark)}"
                >

              </td>

            `;

          }
        );


        html += `

            <td class="student-total">

              ${Number(
                student.total || 0
              )}

            </td>

        `;


        if (averageEnabled) {

          html += `

            <td class="student-average">

              ${Number(
                student.average || 0
              ).toFixed(2)}

            </td>

          `;
        }


        html += `

            <td class="student-position">

              ${
                student.position
                  ? ordinal(student.position)
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


    attachMarkListeners();
}
  /* =========================================================
     MARK LISTENERS
     ========================================================= */

  function attachMarkListeners() {

    const inputs =
      reportPreview.querySelectorAll(
        ".mark-input"
      );


    inputs.forEach(
      function (input) {

        input.addEventListener(
          "input",
          function () {

            updateMark(
              input.dataset.studentId,
              input.dataset.subjectId,
              input.value
            );

          }
        );


        input.addEventListener(
          "change",
          function () {

            updateMark(
              input.dataset.studentId,
              input.dataset.subjectId,
              input.value
            );

          }
        );

      }
    );
  }


  /* =========================================================
     SETTINGS
     ========================================================= */

  function openSettings() {

    const old =
      document.getElementById(
        "settingsModal"
      );

    if (old) {
      old.remove();
    }


    const modal =
      document.createElement("div");

    modal.id =
      "settingsModal";

    modal.className =
      "modal";


    modal.innerHTML = `

      <div
        class="modal-content"
        style="max-width:500px;"
      >

        <div class="modal-header">

          <h3>
            Settings
          </h3>

          <button
            type="button"
            class="modal-close"
            id="settingsClose"
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
            id="schoolNameInput"
            class="form-control"
            value="${escapeHTML(schoolName)}"
            placeholder="Enter school name"
          >

        </div>


        <div class="form-group">

          <label>
            Add Logo
          </label>

          <input
            type="file"
            id="schoolLogoInput"
            class="form-control"
            accept="image/png,image/jpeg,image/jpg,image/webp"
          >

        </div>


        <div
          id="logoPreviewBox"
          style="
            text-align:center;
            margin:15px 0;
          "
        >

          ${
            schoolLogo
              ? `
                <img
                  src="${schoolLogo}"
                  alt="School Logo"
                  style="
                    max-width:120px;
                    max-height:120px;
                    object-fit:contain;
                    border-radius:8px;
                  "
                >
              `
              : `
                <p>
                  No school logo added.
                </p>
              `
          }

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
            id="removeSchoolLogo"
            style="flex:1;"
          >
            Remove Logo
          </button>


          <button
            type="button"
            class="btn btn-primary"
            id="saveSettings"
            style="flex:1;"
          >
            Save Settings
          </button>

        </div>

      </div>

    `;


    document.body.appendChild(modal);


    const closeBtn =
      document.getElementById(
        "settingsClose"
      );


    const saveBtn =
      document.getElementById(
        "saveSettings"
      );


    const removeLogoBtn =
      document.getElementById(
        "removeSchoolLogo"
      );


    const schoolInput =
      document.getElementById(
        "schoolNameInput"
      );


    const logoInput =
      document.getElementById(
        "schoolLogoInput"
      );


    const preview =
      document.getElementById(
        "logoPreviewBox"
      );


    let newLogo =
      schoolLogo;


    if (logoInput) {

      logoInput.addEventListener(
        "change",
        function () {

          const file =
            logoInput.files &&
            logoInput.files[0];


          if (!file) {
            return;
          }


          if (
            !file.type.startsWith(
              "image/"
            )
          ) {

            showActionMessage(
              "Invalid Logo",
              "Please select an image file.",
              "warning"
            );

            return;
          }


          if (
            file.size >
            2 * 1024 * 1024
          ) {

            showActionMessage(
              "Logo Too Large",
              "Please use a logo smaller than 2MB.",
              "warning"
            );

            logoInput.value = "";

            return;
          }


          const reader =
            new FileReader();


          reader.onload =
            function (event) {

              newLogo =
                event.target.result;


              if (preview) {

                preview.innerHTML = `

                  <img
                    src="${newLogo}"
                    alt="School Logo"
                    style="
                      max-width:120px;
                      max-height:120px;
                      object-fit:contain;
                      border-radius:8px;
                    "
                  >

                `;
              }

            };


          reader.readAsDataURL(file);

        }
      );
    }


    function closeSettings() {

      if (
        modal &&
        modal.parentNode
      ) {
        modal.remove();
      }
    }


    if (closeBtn) {

      closeBtn.addEventListener(
        "click",
        closeSettings
      );
    }


    if (removeLogoBtn) {

      removeLogoBtn.addEventListener(
        "click",
        function () {

          newLogo = "";

          if (preview) {

            preview.innerHTML = `

              <p>
                Logo will be removed.
              </p>

            `;
          }

        }
      );
    }


    if (saveBtn) {

      saveBtn.addEventListener(
        "click",
        function () {

          const name =
            schoolInput.value.trim();


          if (name) {
            schoolName = name;
          }


          schoolLogo =
            newLogo;


          saveData();

          updateHeaderLogo();

          closeSettings();


          showActionMessage(
            "Settings Saved",
            "School name and logo settings have been saved.",
            "success"
          );

        }
      );
    }
  }

/* =========================================================
     UPDATE HEADER LOGO
     ========================================================= */

  function updateHeaderLogo() {

    if (!schoolLogo) {
      return;
    }


    const logos =
      document.querySelectorAll(
        ".brand img, .side-menu-brand img"
      );


    logos.forEach(
      function (img) {

        img.src =
          schoolLogo;

        img.alt =
          schoolName + " Logo";

      }
    );
  }


  /* =========================================================
     LOGOUT
     ========================================================= */

  if (logoutBtn) {

    logoutBtn.addEventListener(
      "click",
      function () {

        closeMenu();


        const answer =
          window.confirm(
            "Are you sure you want to logout?"
          );


        if (!answer) {
          return;
        }


        showActionMessage(
          "Logout",
          "Logout completed.",
          "info"
        );

      }
    );
  }


  /* =========================================================
     CLEAR ALL DATA
     ========================================================= */

  if (clearDataBtn) {

    clearDataBtn.addEventListener(
      "click",
      function () {

        const answer =
          window.confirm(
            "WARNING: This will delete all students, subjects, marks and results. Continue?"
          );


        if (!answer) {
          return;
        }


        localStorage.removeItem(
          "myStudents"
        );

        localStorage.removeItem(
          "mySubjects"
        );

        localStorage.removeItem(
          "calculationDone"
        );

        localStorage.removeItem(
          "positionDone"
        );

        localStorage.removeItem(
          "averageEnabled"
        );


        students = [];

        subjects = [];

        calculationDone = false;

        positionDone = false;

        averageEnabled = false;


        saveData();

        updateDashboard();

        renderReport();


        showActionMessage(
          "All Data Cleared",
          "All student data has been removed successfully.",
          "success"
        );

      }
    );
  }


  /* =========================================================
     PRINT / DOWNLOAD HELPERS
     ========================================================= */

  function createPrintWindow(
    title,
    bodyHTML,
    orientation = "portrait"
  ) {

    const printWindow =
      window.open(
        "",
        "_blank"
      );


    if (!printWindow) {

      alert(
        "Please allow pop-ups for this website so the report can be printed or saved as PDF."
      );

      return null;
    }


    const landscape =
      orientation === "landscape";


    printWindow.document.open();


    printWindow.document.write(`

      <!DOCTYPE html>

      <html>

      <head>

        <meta charset="UTF-8">

        <title>
          ${escapeHTML(title)}
        </title>

        <style>

          @page {
            size: A4 ${landscape ? "landscape" : "portrait"};
            margin: 10mm;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: #111;
            background: white;
          }

          .print-page {
            width: 100%;
            min-height: 100%;
            page-break-after: always;
          }

          .print-page:last-child {
            page-break-after: auto;
          }

          .school-header {
            text-align: center;
            margin-bottom: 8px;
          }

          .school-logo {
            width: 65px;
            height: 65px;
            object-fit: contain;
            display: block;
            margin: 0 auto 5px;
          }

          .school-name {
            font-size: 22px;
            font-weight: 800;
            margin: 3px 0;
            text-transform: uppercase;
          }

          .report-title {
            font-size: 16px;
            font-weight: 700;
            margin: 4px 0 10px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            border: 1px solid #777;
            padding: 5px 4px;
            text-align: center;
            font-size: 10px;
          }

          th {
            background: #0b5d3b;
            color: white;
            font-weight: 700;
          }

          td.name {
            text-align: left;
            font-weight: 600;
          }

          .total-cell {
            font-weight: 700;
          }

          .position-cell {
            font-weight: 700;
          }

          .student-info {
            width: 100%;
            margin-bottom: 12px;
          }

          .student-info td {
            border: none;
            text-align: left;
            padding: 3px 5px;
            font-size: 13px;
          }

          .student-info .label {
            width: 25%;
            font-weight: 700;
          }

          .summary-box {
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            gap: 10px;
          }

          .summary-item {
            border: 1px solid #555;
            padding: 8px;
            flex: 1;
            text-align: center;
            font-weight: 700;
          }

          .footer {
            margin-top: 18px;
            text-align: center;
            font-size: 10px;
          }

          .signature-area {
            margin-top: 35px;
            display: flex;
            justify-content: space-between;
          }

          .signature {
            width: 28%;
            text-align: center;
            border-top: 1px solid #222;
            padding-top: 5px;
            font-size: 11px;
          }

          .class-summary-title {
            text-align: center;
            font-size: 17px;
            font-weight: 800;
            margin-bottom: 10px;
          }

          .note {
            margin-top: 12px;
            font-size: 10px;
          }

          @media print {

            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .no-print {
              display: none !important;
            }

          }

        </style>

      </head>

      <body>

        ${bodyHTML}

        <script>

          window.onload = function () {

            setTimeout(function () {
              window.print();
            }, 500);

          };

        <\/script>

      </body>

      </html>

    `);


    printWindow.document.close();


    return printWindow;
  }


  /* =========================================================
     SCHOOL HEADER FOR PRINT
     ========================================================= */

  function printSchoolHeader(
    reportTitle
  ) {

    return `

      <div class="school-header">

        ${
          schoolLogo
            ? `
              <img
                class="school-logo"
                src="${schoolLogo}"
                alt="School Logo"
              >
            `
            : ""
        }

        <div class="school-name">
          ${escapeHTML(schoolName)}
        </div>

        <div class="report-title">
          ${escapeHTML(reportTitle)}
        </div>

      </div>

    `;
  }


  /* =========================================================
     DOWNLOAD REPORT
     ========================================================= */

  function buildClassReportHTML() {

    const pages = [];

    const perPage = 30;


    for (
      let start = 0;
      start < students.length;
      start += perPage
    ) {

      const pageStudents =
        students.slice(
          start,
          start + perPage
        );


      let table = `

        <table>

          <thead>

            <tr>

              <th>S/N</th>

              <th>Student Name</th>

      `;


      subjects.forEach(
        function (subject) {

          table += `

            <th>
              ${escapeHTML(subject.name)}
            </th>

          `;

        }
      );


      table += `

              <th>Total</th>

      `;


      if (averageEnabled) {

        table += `

              <th>Average</th>

        `;
      }


      table += `

              <th>Position</th>

            </tr>

          </thead>

          <tbody>

      `;


      pageStudents.forEach(
        function (student, localIndex) {

          const realIndex =
            start + localIndex;


          table += `

            <tr>

              <td>
                ${realIndex + 1}
              </td>

              <td class="name">
                ${escapeHTML(student.name)}
              </td>

          `;


          subjects.forEach(
            function (subject) {

              const mark =
                student.marks &&
                student.marks[
                  subject.id
                ] !== undefined
                  ? student.marks[
                      subject.id
                    ]
                  : "";


              table += `

                <td>
                  ${escapeHTML(mark)}
                </td>

              `;

            }
          );


          table += `

              <td class="total-cell">
                ${Number(student.total || 0)}
              </td>

          `;


          if (averageEnabled) {

            table += `

              <td>
                ${Number(
                  student.average || 0
                ).toFixed(2)}
              </td>

            `;
          }


          table += `

              <td class="position-cell">
                ${
                  student.position
                    ? ordinal(student.position)
                    : "—"
                }
              </td>

            </tr>

          `;

        }
      );


      table += `

          </tbody>

        </table>

      `;


      pages.push(`

        <div class="print-page">

          ${printSchoolHeader(
            "STUDENT RESULT REPORT"
          )}

          ${table}

          <div class="footer">
            Page ${
              Math.floor(start / perPage) + 1
            }
          </div>

        </div>

      `);

    }


    return pages.join("");
  }


  function downloadClassReport() {

    if (students.length === 0) {

      alert(
        "Please add students first."
      );

      return;
    }


    if (subjects.length === 0) {

      alert(
        "Please add subjects first."
      );

      return;
    }


    if (!calculationDone) {

      alert(
        "Please calculate results first."
      );

      return;
    }


    createPrintWindow(
      "Student Result Report",
      buildClassReportHTML(),
      "landscape"
    );
     }
 /* =========================================================
     STUDENT REPORT
     ========================================================= */

  function buildStudentReportsHTML() {

    let html = "";


    students.forEach(
      function (student, index) {

        let subjectRows = "";

        let totalMarks =
          Number(student.total || 0);


        subjects.forEach(
          function (subject, subjectIndex) {

            const mark =
              student.marks &&
              student.marks[
                subject.id
              ] !== undefined
                ? Number(
                    student.marks[
                      subject.id
                    ]
                  )
                : 0;


            subjectRows += `

              <tr>

                <td>
                  ${subjectIndex + 1}
                </td>

                <td class="name">
                  ${escapeHTML(subject.name)}
                </td>

                <td>
                  100
                </td>

                <td>
                  ${mark}
                </td>

                <td>
                  ${mark}
                </td>

              </tr>

            `;

          }
        );


        html += `

          <div class="print-page">

            ${printSchoolHeader(
              "STUDENT REPORT SHEET"
            )}


            <table class="student-info">

              <tr>

                <td class="label">
                  STUDENT NAME:
                </td>

                <td>
                  ${escapeHTML(student.name)}
                </td>

              </tr>

              <tr>

                <td class="label">
                  STUDENT NO:
                </td>

                <td>
                  ${index + 1}
                </td>

              </tr>

            </table>


            <table>

              <thead>

                <tr>

                  <th>S/N</th>

                  <th>SUBJECT</th>

                  <th>MAXIMUM MARK</th>

                  <th>SCORE</th>

                  <th>TOTAL MARKS</th>

                </tr>

              </thead>

              <tbody>

                ${subjectRows}

              </tbody>

            </table>


            <div class="summary-box">

              <div class="summary-item">

                TOTAL MARKS

                <br>

                ${totalMarks}

              </div>


              ${
                averageEnabled
                  ? `
                    <div class="summary-item">

                      AVERAGE

                      <br>

                      ${Number(
                        student.average || 0
                      ).toFixed(2)}

                    </div>
                  `
                  : ""
              }


              <div class="summary-item">

                POSITION

                <br>

                ${
                  student.position
                    ? ordinal(student.position)
                    : "—"
                }

              </div>

            </div>


            <div class="signature-area">

              <div class="signature">
                Class Teacher
              </div>

              <div class="signature">
                Head of Department
              </div>

              <div class="signature">
                Principal
              </div>

            </div>


            <div class="footer">

              ${escapeHTML(schoolName)}

              <br>

              Student Result Management System

            </div>

          </div>

        `;

      }
    );


    return html;
  }


  function downloadStudentReports() {

    if (students.length === 0) {

      alert(
        "Please add students first."
      );

      return;
    }


    if (subjects.length === 0) {

      alert(
        "Please add subjects first."
      );

      return;
    }


    if (!calculationDone) {

      alert(
        "Please calculate results first."
      );

      return;
    }


    createPrintWindow(
      "Student Reports",
      buildStudentReportsHTML(),
      "portrait"
    );
  }


  /* =========================================================
     DOWNLOAD OPTIONS
     ========================================================= */

  function openDownloadOptions() {

    const old =
      document.getElementById(
        "downloadOptionsModal"
      );

    if (old) {
      old.remove();
    }


    const modal =
      document.createElement("div");

    modal.id =
      "downloadOptionsModal";

    modal.className =
      "modal";


    modal.innerHTML = `

      <div
        class="modal-content"
        style="max-width:430px;"
      >

        <div class="modal-header">

          <h3>
            Download Options
          </h3>

          <button
            type="button"
            class="modal-close"
            id="closeDownloadOptions"
          >
            ×
          </button>

        </div>


        <p>
          Choose the type of report you want to download.
        </p>


        <div
          style="
            display:flex;
            flex-direction:column;
            gap:12px;
            margin-top:20px;
          "
        >

          <button
            type="button"
            class="btn btn-primary"
            id="downloadReportOption"
          >
            📄 Download Report
            <small>
              Class report — A4 Landscape
            </small>
          </button>


          <button
            type="button"
            class="btn btn-success"
            id="downloadStudentReportOption"
          >
            👨‍🎓 Download Student Report
            <small>
              Individual student reports — A4
            </small>
          </button>

        </div>

      </div>

    `;


    document.body.appendChild(modal);


    const closeBtn =
      document.getElementById(
        "closeDownloadOptions"
      );


    const reportBtn =
      document.getElementById(
        "downloadReportOption"
      );


    const studentBtn =
      document.getElementById(
        "downloadStudentReportOption"
      );


    function close() {

      if (
        modal &&
        modal.parentNode
      ) {
        modal.remove();
      }
    }


    if (closeBtn) {

      closeBtn.addEventListener(
        "click",
        close
      );
    }


    if (reportBtn) {

      reportBtn.addEventListener(
        "click",
        function () {

          close();

          downloadClassReport();

        }
      );
    }


    if (studentBtn) {

      studentBtn.addEventListener(
        "click",
        function () {

          close();

          downloadStudentReports();

        }
      );
    }
  }


  if (downloadPdfBtn) {

    downloadPdfBtn.addEventListener(
      "click",
      openDownloadOptions
    );
  }


  /* =========================================================
     PRINT REPORT
     ========================================================= */

  if (printReportBtn) {

    printReportBtn.addEventListener(
      "click",
      function () {

        if (
          students.length === 0 ||
          subjects.length === 0
        ) {

          alert(
            "Please add students and subjects first."
          );

          return;
        }


        if (!calculationDone) {

          alert(
            "Please calculate results first."
          );

          return;
        }


        createPrintWindow(
          "Student Result Report",
          buildClassReportHTML(),
          "landscape"
        );

      }
    );
  }


  /* =========================================================
     KEYBOARD ESCAPE
     ========================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  /* =========================================================
     INITIALIZE
     ========================================================= */

  updateHeaderLogo();

  updateDashboard();

  renderReport();


});  
