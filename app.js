"use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     MY STUDENT — COMPLETE APP.JS
     Offline Student Result Management System
  ========================================================= */


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
    localStorage.getItem("averageEnabled") === "false"
      ? false
      : true;


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
     ORDINAL POSITION
  ========================================================= */

  function ordinal(number) {

    const n = Number(number);

    if (n % 100 >= 11 && n % 100 <= 13) {
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
     MESSAGE
  ========================================================= */

  function showMessage(
    title,
    message,
    type = "success"
  ) {

    const card =
      document.querySelector(
        ".quick-actions-card"
      );

    if (!card) {
      alert(title + "\n\n" + message);
      return;
    }

    let box =
      card.querySelector(
        ".quick-action-message"
      );

    if (!box) {

      box =
        document.createElement("div");

      box.className =
        "quick-action-message";

      card.appendChild(box);
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

    box.className =
      "quick-action-message " + type;

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

    if (type !== "loading") {

      setTimeout(function () {

        if (box.parentNode) {
          box.remove();
        }

      }, 4000);
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
      menuOverlay.classList.add("active");
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
      menuOverlay.classList.remove("active");
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

            <option>Pre-Nursery</option>

            <option>Nursery 1</option>
            <option>Nursery 2</option>
            <option>Nursery 3</option>

            <option>Primary 1</option>
            <option>Primary 2</option>
            <option>Primary 3</option>
            <option>Primary 4</option>
            <option>Primary 5</option>
            <option>Primary 6</option>

            <option>JSS 1</option>
            <option>JSS 2</option>
            <option>JSS 3</option>

            <option>SSS 1</option>
            <option>SSS 2</option>
            <option>SSS 3</option>

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
              ${settings.term === "First Term"
                ? "selected"
                : ""}
            >
              First Term
            </option>

            <option
              ${settings.term === "Second Term"
                ? "selected"
                : ""}
            >
              Second Term
            </option>

            <option
              ${settings.term === "Third Term"
                ? "selected"
                : ""}
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
            Logo will appear on individual and class reports.
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

    document.body.appendChild(modal);


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

    const logoPreview =
      document.getElementById(
        "logoPreview"
      );


    function closeSetup() {
      modal.remove();
    }


    if (close) {
      close.addEventListener(
        "click",
        closeSetup
      );
    }


    if (cancel) {
      cancel.addEventListener(
        "click",
        closeSetup
      );
    }


    if (logo) {

      logo.addEventListener(
        "change",
        function () {

          const file =
            logo.files[0];

          if (!file) {
            return;
          }

          if (file.size > 2 * 1024 * 1024) {

            alert(
              "Logo is too large. Maximum size is 2MB."
            );

            logo.value = "";

            return;
          }

          const reader =
            new FileReader();

          reader.onload =
            function (event) {

              logoPreview.innerHTML = `

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

          reader.readAsDataURL(file);
        }
      );
    }


    if (save) {

      save.addEventListener(
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

            alert(
              "Please enter the school name."
            );

            return;
          }


          if (!teacherName) {

            alert(
              "Please enter the teacher name."
            );

            return;
          }


          if (!className) {

            alert(
              "Please select the class."
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
            logo &&
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
                  "School information has been saved successfully.",
                  "success"
                );

                renderReport();
              };

            reader.readAsDataURL(file);

          } else {

            saveData();

            closeSetup();

            showMessage(
              "Setup Saved",
              "School information has been saved successfully.",
              "success"
            );

            renderReport();
          }

        }
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


    close.addEventListener(
      "click",
      closeModal
    );

    cancel.addEventListener(
      "click",
      closeModal
    );


    save.addEventListener(
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


    input.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Enter") {

          event.preventDefault();

          save.click();
        }

        if (event.key === "Escape") {

          event.preventDefault();

          closeModal();
        }
      }
    );


    setTimeout(
      function () {
        input.focus();
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
              ).toLowerCase() ===
              name.toLowerCase();

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
            Date.now() +
            Math.random(),

          name:
            name,

          studentNo:
            students.length + 1,

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
          "Student Added",
          escapeHTML(name),
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
              ).toLowerCase() ===
              name.toLowerCase();

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
            Date.now() +
            Math.random(),

          name:
            name,

          maximum:
            100

        });


        students.forEach(
          function (student) {

            if (!student.marks) {
              student.marks = {};
            }

          }
        );


        calculationDone = false;

        positionDone = false;


        saveData();

        updateDashboard();

        renderReport();


        showMessage(
          "Subject Added",
          escapeHTML(name) +
          "<br>Maximum Mark: 100",
          "success"
        );
      }
    );
  }


  /* =========================================================
     AVERAGE BUTTON
  ========================================================= */

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

    if (title) {

      title.textContent =
        averageEnabled
          ? "Average: ON"
          : "Average";
    }


    const description =
      button.querySelector(
        ".action-description"
      );

    if (description) {

      description.textContent =
        averageEnabled
          ? "Average included"
          : "Optional average view";
    }
  }


  function toggleAverage() {

    averageEnabled =
      !averageEnabled;

    saveData();

    updateAverageButton();

    renderReport();


    showMessage(
      averageEnabled
        ? "Average Enabled"
        : "Average Disabled",

      averageEnabled
        ? "Average will be included in reports."
        : "Average will not be included.",

      "info"
    );
  }


  /* =========================================================
     MARK INPUT
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

      let mark =
        Number(value);


      if (!Number.isFinite(mark)) {
        mark = 0;
      }


      if (mark < 0) {
        mark = 0;
      }


      if (mark > 100) {
        mark = 100;
      }


      student.marks[
        subjectId
      ] = mark;
    }


    calculationDone = false;

    positionDone = false;


    saveData();

    updateDashboard();
        }
  /* =========================================================
     CALCULATE RESULTS
  ========================================================= */

  function calculateMarks() {

    if (students.length === 0) {

      showMessage(
        "No Students Yet",
        "Please add students first.",
        "warning"
      );

      return;
    }


    if (subjects.length === 0) {

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
            style="width:0%"
          ></div>

        </div>
      `,
      "loading"
    );


    let progress = 0;


    const timer =
      setInterval(
        function () {

          progress += 10;


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
        80
      );
  }


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

            const value =
              Number(
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


        student.position =
          null;
      }
    );


    calculationDone = true;

    positionDone = false;


    saveData();

    updateDashboard();

    renderReport();


    if (calculateBtn) {
      calculateBtn.disabled = false;
    }


    showMessage(
      "Calculation Completed",
      "All student results have been calculated successfully.",
      "success"
    );
  }


  /* =========================================================
     MAKE POSITION
  ========================================================= */

  function makePosition() {

    if (students.length === 0) {

      showMessage(
        "No Students Yet",
        "Please add students first.",
        "warning"
      );

      return;
    }


    if (subjects.length === 0) {

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
            style="width:0%"
          ></div>

        </div>
      `,
      "loading"
    );


    let progress = 0;


    const timer =
      setInterval(
        function () {

          progress += 10;


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
        80
      );
  }


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


    let position = 0;

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

          position =
            index + 1;
        }


        student.position =
          position;


        previousTotal =
          total;
      }
    );


    students =
      students.map(
        function (student) {

          return (
            sorted.find(
              function (item) {

                return String(item.id) ===
                  String(student.id);

              }
            ) || student
          );

        }
      );


    positionDone = true;


    saveData();

    updateDashboard();

    renderReport();


    if (positionBtn) {
      positionBtn.disabled = false;
    }


    showMessage(
      "Position Completed",
      "Student positions have been calculated successfully.",
      "success"
    );
      }
  /* =========================================================
     REPORT PREVIEW
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
            then enter their marks.
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
            <small>
              (100)
            </small>
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

          <tr>

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

            const value =
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
                  value="${escapeHTML(
                    value
                  )}"
                  class="mark-input"
                  data-student-id="${escapeHTML(
                    student.id
                  )}"
                  data-subject-id="${escapeHTML(
                    subject.id
                  )}"
                  inputmode="numeric"
                >

              </td>

            `;

          }
        );


        html += `

            <td>
              <strong>
                ${Number(
                  student.total || 0
                )}
              </strong>
            </td>
        `;


        if (averageEnabled) {

          html += `

            <td>
              ${Number(
                student.average || 0
              ).toFixed(2)}
            </td>

          `;
        }


        html += `

            <td>
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


    const inputs =
      reportPreview.querySelectorAll(
        ".mark-input"
      );


    inputs.forEach(
      function (input) {

        input.addEventListener(
          "change",
          function () {

            updateMark(
              input.dataset.studentId,
              input.dataset.subjectId,
              input.value
            );

            renderReport();

          }
        );

      }
    );
  }


  /* =========================================================
     MENU ITEM HELPERS
  ========================================================= */

  function menuMessage(text) {

    closeMenu();

    showMessage(
      "My Student",
      text,
      "info"
    );
  }


  /* =========================================================
     STUDENTS LIST
  ========================================================= */

  function showStudentsList() {

    closeMenu();

    let content = "";

    if (students.length === 0) {

      content = `
        <p>
          No students have been added yet.
        </p>
      `;

    } else {

      content = `

        <div
          style="
            max-height:400px;
            overflow-y:auto;
          "
        >

          ${students.map(
            function (student, index) {

              return `

                <div
                  style="
                    padding:12px;
                    border-bottom:1px solid #ddd;
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                  "
                >

                  <strong>
                    ${index + 1}.
                    ${escapeHTML(
                      student.name
                    )}
                  </strong>

                  <button
                    type="button"
                    class="btn btn-danger delete-student"
                    data-id="${escapeHTML(
                      student.id
                    )}"
                    style="
                      padding:5px 10px;
                    "
                  >
                    Delete
                  </button>

                </div>

              `;

            }
          ).join("")}

        </div>

      `;
    }


    openSimpleModal(
      "Students",
      content
    );


    document
      .querySelectorAll(
        ".delete-student"
      )
      .forEach(
        function (button) {

          button.addEventListener(
            "click",
            function () {

              const id =
                button.dataset.id;


              students =
                students.filter(
                  function (student) {

                    return String(
                      student.id
                    ) !==
                    String(id);

                  }
                );


              calculationDone =
                false;

              positionDone =
                false;


              saveData();

              updateDashboard();

              renderReport();

              showStudentsList();
            }
          );

        }
      );
      }

  /* =========================================================
     SUBJECTS LIST
  ========================================================= */

  function showSubjectsList() {

    closeMenu();

    let content = "";

    if (subjects.length === 0) {

      content = `
        <p>
          No subjects have been added yet.
        </p>
      `;

    } else {

      content = `

        <div
          style="
            max-height:400px;
            overflow-y:auto;
          "
        >

          ${subjects.map(
            function (subject, index) {

              return `

                <div
                  style="
                    padding:12px;
                    border-bottom:1px solid #ddd;
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                  "
                >

                  <strong>
                    ${index + 1}.
                    ${escapeHTML(
                      subject.name
                    )}
                  </strong>

                  <span>
                    Maximum: 100
                  </span>

                </div>

              `;

            }
          ).join("")}

        </div>

      `;
    }


    openSimpleModal(
      "Subjects",
      content
    );
  }


  /* =========================================================
     SIMPLE MODAL
  ========================================================= */

  function openSimpleModal(
    title,
    content
  ) {

    const old =
      document.getElementById(
        "simpleInfoModal"
      );

    if (old) {
      old.remove();
    }


    const modal =
      document.createElement("div");

    modal.id =
      "simpleInfoModal";

    modal.className =
      "modal";


    modal.innerHTML = `

      <div
        class="modal-content"
        style="max-width:650px;"
      >

        <div class="modal-header">

          <h3>
            ${escapeHTML(title)}
          </h3>

          <button
            type="button"
            class="modal-close"
            id="simpleClose"
          >
            ×
          </button>

        </div>

        ${content}

      </div>

    `;


    document.body.appendChild(modal);


    document
      .getElementById(
        "simpleClose"
      )
      .addEventListener(
        "click",
        function () {

          modal.remove();

        }
      );
  }


  /* =========================================================
     PRINT / DOWNLOAD MODAL
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

      <div class="modal-content">

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


        <p>
          Choose the type of report you want.
        </p>


        <button
          type="button"
          class="btn btn-primary"
          id="downloadClassReport"
          style="
            width:100%;
            margin-top:12px;
          "
        >
          📊 Download Class Report
          <small>
            A4 Landscape
          </small>
        </button>


        <button
          type="button"
          class="btn btn-success"
          id="downloadStudentReport"
          style="
            width:100%;
            margin-top:12px;
          "
        >
          👨‍🎓 Download Student Report
          <small>
            A4 Portrait
          </small>
        </button>

      </div>

    `;


    document.body.appendChild(modal);


    document
      .getElementById(
        "downloadClose"
      )
      .addEventListener(
        "click",
        function () {

          modal.remove();

        }
      );


    document
      .getElementById(
        "downloadClassReport"
      )
      .addEventListener(
        "click",
        function () {

          modal.remove();

          printClassReport();

        }
      );


    document
      .getElementById(
        "downloadStudentReport"
      )
      .addEventListener(
        "click",
        function () {

          modal.remove();

          chooseStudentForReport();

        }
      );
  }


  /* =========================================================
     CHOOSE STUDENT
  ========================================================= */

  function chooseStudentForReport() {

    if (students.length === 0) {

      showMessage(
        "No Students",
        "Please add students first.",
        "warning"
      );

      return;
    }


    const options =
      students.map(
        function (student, index) {

          return `

            <option
              value="${escapeHTML(
                student.id
              )}"
            >
              ${index + 1}.
              ${escapeHTML(
                student.name
              )}
            </option>

          `;

        }
      ).join("");


    const modal =
      document.createElement("div");

    modal.id =
      "studentReportChoice";

    modal.className =
      "modal";


    modal.innerHTML = `

      <div class="modal-content">

        <div class="modal-header">

          <h3>
            Select Student
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
            Student
          </label>

          <select
            id="studentReportSelect"
            class="form-control"
          >

            ${options}

          </select>

        </div>


        <button
          type="button"
          class="btn btn-success"
          id="generateStudentReport"
          style="
            width:100%;
            margin-top:15px;
          "
        >
          Download Student Report
        </button>

      </div>

    `;


    document.body.appendChild(modal);


    document
      .getElementById(
        "studentChoiceClose"
      )
      .addEventListener(
        "click",
        function () {

          modal.remove();

        }
      );


    document
      .getElementById(
        "generateStudentReport"
      )
      .addEventListener(
        "click",
        function () {

          const id =
            document
              .getElementById(
                "studentReportSelect"
              )
              .value;


          const student =
            students.find(
              function (item) {

                return String(item.id) ===
                  String(id);

              }
            );


          modal.remove();


          if (student) {
            printIndividualReport(
              student
            );
          }

        }
      );
  }


  /* =========================================================
     PRINT WINDOW
  ========================================================= */

  function openPrintWindow(
    html,
    title,
    orientation
  ) {

    const printWindow =
      window.open(
        "",
        "_blank"
      );


    if (!printWindow) {

      alert(
        "Please allow pop-ups for this website so the report can be printed."
      );

      return;
    }


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
            size: A4 ${orientation};
            margin: 8mm;
          }

          * {
            box-sizing:border-box;
          }

          html,
          body {
            margin:0;
            padding:0;
            background:#fff;
            color:#111;
            font-family:
              Arial,
              Helvetica,
              sans-serif;
          }

          body {
            width:100%;
          }

          .report-page {
            width:100%;
            background:#fff;
          }

          .school-header {
            display:flex;
            align-items:center;
            gap:15px;
            border-bottom:3px solid #075b36;
            padding-bottom:8px;
            margin-bottom:10px;
          }

          .school-logo {
            width:65px;
            height:65px;
            object-fit:contain;
          }

          .school-name {
            flex:1;
          }

          .school-name h1 {
            margin:0;
            font-size:22px;
            color:#075b36;
            text-transform:uppercase;
          }

          .school-name p {
            margin:3px 0;
            font-size:10px;
          }

          .report-title {
            text-align:center;
            background:#075b36;
            color:white;
            padding:7px;
            font-size:15px;
            font-weight:bold;
            margin-bottom:10px;
          }

          .info-grid {
            display:grid;
            grid-template-columns:
              1fr 1fr;
            gap:5px 20px;
            margin-bottom:10px;
            font-size:10px;
          }

          .info-item {
            display:flex;
            gap:5px;
          }

          .info-item strong {
            min-width:95px;
          }

          table {
            width:100%;
            border-collapse:collapse;
          }

          th {
            background:#075b36;
            color:white;
            font-size:9px;
            padding:5px 3px;
            border:1px solid #333;
          }

          td {
            font-size:9px;
            padding:4px 3px;
            border:1px solid #888;
            text-align:center;
          }

          td.name {
            text-align:left;
            font-weight:bold;
          }

          .total-box {
            margin-top:10px;
            display:flex;
            gap:10px;
          }

          .summary-box {
            flex:1;
            border:1.5px solid #075b36;
            padding:7px;
            text-align:center;
            font-weight:bold;
            font-size:11px;
          }

          .summary-value {
            font-size:16px;
            margin-top:3px;
            color:#075b36;
          }

          .position-box {
            border:1.5px solid #075b36;
            padding:10px;
            text-align:center;
            margin-top:10px;
          }

          .position-value {
            font-size:22px;
            font-weight:bold;
            color:#075b36;
          }

          .remarks {
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:25px;
            margin-top:12px;
          }

          .remark-box {
            min-height:65px;
          }

          .remark-title {
            font-weight:bold;
            font-size:10px;
            margin-bottom:5px;
          }

          .remark-line {
            border-bottom:1px dotted #777;
            height:17px;
          }

          .signature-row {
            display:flex;
            justify-content:space-between;
            margin-top:20px;
          }

          .signature {
            width:28%;
            text-align:center;
            border-top:1px solid #111;
            padding-top:4px;
            font-size:9px;
          }

          .grading {
            margin-top:10px;
            width:220px;
          }

          .grading th,
          .grading td {
            font-size:8px;
            padding:3px;
          }

          .footer {
            text-align:center;
            margin-top:12px;
            font-size:8px;
            color:#555;
          }

          .individual-layout {
            display:grid;
            grid-template-columns:1fr 180px;
            gap:12px;
            align-items:start;
          }

          .student-box {
            border:1px solid #777;
            padding:8px;
            font-size:10px;
          }

          .student-box div {
            margin:4px 0;
          }

          .grade-cell {
            font-weight:bold;
          }

          .no-break {
            break-inside:avoid;
          }

          @media print {

            .no-print {
              display:none;
            }

          }

        </style>

      </head>

      <body>

        ${html}

        <script>

          window.onload = function () {

            setTimeout(
              function () {
                window.print();
              },
              500
            );

          };

        <\/script>

      </body>

      </html>

    `);


    printWindow.document.close();
}

/* =========================================================
     CLASS REPORT
  ========================================================= */

  function printClassReport() {

    if (students.length === 0) {

      showMessage(
        "No Students",
        "Add students first.",
        "warning"
      );

      return;
    }


    if (subjects.length === 0) {

      showMessage(
        "No Subjects",
        "Add subjects first.",
        "warning"
      );

      return;
    }


    if (!calculationDone) {

      showMessage(
        "Calculate First",
        "Please calculate results before downloading the class report.",
        "warning"
      );

      return;
    }


    let html = `

      <div class="report-page">

        <div class="school-header">

          ${
            settings.logo
              ? `
                <img
                  class="school-logo"
                  src="${settings.logo}"
                >
              `
              : ""
          }

          <div class="school-name">

            <h1>
              ${escapeHTML(
                settings.schoolName ||
                "MY SCHOOL"
              )}
            </h1>

            <p>
              ${escapeHTML(
                settings.schoolAddress ||
                ""
              )}
            </p>

          </div>

        </div>


        <div class="report-title">
          CLASS STUDENT RESULT REPORT
        </div>


        <div class="info-grid">

          <div class="info-item">
            <strong>CLASS:</strong>
            ${escapeHTML(
              settings.className ||
              ""
            )}
          </div>

          <div class="info-item">
            <strong>SESSION:</strong>
            ${escapeHTML(
              settings.session ||
              ""
            )}
          </div>

          <div class="info-item">
            <strong>TERM:</strong>
            ${escapeHTML(
              settings.term ||
              "First Term"
            )}
          </div>

          <div class="info-item">
            <strong>TEACHER:</strong>
            ${escapeHTML(
              settings.teacherName ||
              ""
            )}
          </div>

          <div class="info-item">
            <strong>TOTAL STUDENTS:</strong>
            ${students.length}
          </div>

        </div>


        <table>

          <thead>

            <tr>

              <th>S/N</th>

              <th>STUDENT NAME</th>

              <th>STUDENT NO.</th>

    `;


    subjects.forEach(
      function (subject) {

        html += `

          <th>
            ${escapeHTML(
              subject.name
            )}
            <br>
            (100)
          </th>

        `;

      }
    );


    html += `

              <th>
                TOTAL MARKS
              </th>
    `;


    if (averageEnabled) {

      html += `

              <th>
                AVERAGE
              </th>

      `;
    }


    html += `

              <th>
                POSITION
              </th>

            </tr>

          </thead>

          <tbody>

    `;


    students.forEach(
      function (student, index) {

        html += `

          <tr>

            <td>
              ${index + 1}
            </td>

            <td class="name">
              ${escapeHTML(
                student.name
              )}
            </td>

            <td>
              ${escapeHTML(
                student.studentNo ||
                index + 1
              )}
            </td>

        `;


        subjects.forEach(
          function (subject) {

            const mark =
              Number(
                student.marks &&
                student.marks[
                  subject.id
                ]
              ) || 0;


            html += `

              <td>
                ${mark}
              </td>

            `;

          }
        );


        html += `

            <td>
              <strong>
                ${Number(
                  student.total || 0
                )}
              </strong>
            </td>
        `;


        if (averageEnabled) {

          html += `

            <td>
              ${Number(
                student.average || 0
              ).toFixed(2)}
            </td>

          `;
        }


        html += `

            <td>
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


        <div class="footer">

          ${escapeHTML(
            settings.schoolName ||
            "My School"
          )}

          —

          ${escapeHTML(
            settings.teacherName ||
            ""
          )}

          —

          Printed on:
          ${new Date().toLocaleDateString()}

        </div>

      </div>

    `;


    openPrintWindow(
      html,
      "Class Student Result Report",
      "landscape"
    );
  }


  /* =========================================================
     INDIVIDUAL STUDENT REPORT
  ========================================================= */

  function printIndividualReport(
    student
  ) {

    if (!student) {
      return;
    }


    if (!calculationDone) {

      showMessage(
        "Calculate First",
        "Please calculate the results before downloading the individual report.",
        "warning"
      );

      return;
    }


    let total =
      Number(
        student.total || 0
      );


    const maximumTotal =
      subjects.length * 100;


    let html = `

      <div class="report-page">

        <div class="school-header">

          ${
            settings.logo
              ? `
                <img
                  class="school-logo"
                  src="${settings.logo}"
                  alt="School Logo"
                >
              `
              : ""
          }

          <div class="school-name">

            <h1>
              ${escapeHTML(
                settings.schoolName ||
                "MY SCHOOL"
              )}
            </h1>

            <p>
              ${escapeHTML(
                settings.schoolAddress ||
                ""
              )}
            </p>

          </div>

        </div>


        <div class="report-title">
          STUDENT REPORT SHEET
        </div>


        <div class="individual-layout">

          <div>

            <div class="student-box">

              <div>
                <strong>
                  STUDENT NAME:
                </strong>

                ${escapeHTML(
                  student.name
                )}
              </div>

              <div>
                <strong>
                  STUDENT NO:
                </strong>

                ${escapeHTML(
                  student.studentNo ||
                  ""
                )}
              </div>

              <div>
                <strong>
                  CLASS:
                </strong>

                ${escapeHTML(
                  settings.className ||
                  ""
                )}
              </div>

              <div>
                <strong>
                  SESSION:
                </strong>

                ${escapeHTML(
                  settings.session ||
                  ""
                )}
              </div>

              <div>
                <strong>
                  TERM:
                </strong>

                ${escapeHTML(
                  settings.term ||
                  "First Term"
                )}
              </div>

              <div>
                <strong>
                  TOTAL STUDENTS:
                </strong>

                ${students.length}
              </div>

              <div>
                <strong>
                  CLASS TEACHER:
                </strong>

                ${escapeHTML(
                  settings.teacherName ||
                  ""
                )}
              </div>

            </div>


            <table
              style="
                margin-top:10px;
              "
            >

              <thead>

                <tr>

                  <th>
                    S/N
                  </th>

                  <th>
                    SUBJECT
                  </th>

                  <th>
                    MAXIMUM MARK
                  </th>

                  <th>
                    SCORE
                  </th>

                  <th>
                    GRADE
                  </th>

                </tr>

              </thead>

              <tbody>

    `;


    subjects.forEach(
      function (subject, index) {

        const score =
          Number(
            student.marks &&
            student.marks[
              subject.id
            ]
          ) || 0;


        const grade =
          getGrade(score);


        html += `

          <tr>

            <td>
              ${index + 1}
            </td>

            <td class="name">
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

            <td class="grade-cell">
              ${grade}
            </td>

          </tr>

        `;
      }
    );


    html += `

              </tbody>

            </table>


            <div class="total-box">

              <div class="summary-box">

                TOTAL MARKS

                <div class="summary-value">
                  ${total} / ${maximumTotal}
                </div>

              </div>


              ${
                averageEnabled
                  ? `
                    <div class="summary-box">

                      AVERAGE

                      <div class="summary-value">
                        ${Number(
                          student.average || 0
                        ).toFixed(2)}
                      </div>

                    </div>
                  `
                  : ""
              }

            </div>


            <div class="remarks">

              <div class="remark-box">

                <div class="remark-title">
                  CLASS TEACHER REMARK
                </div>

                <div class="remark-line"></div>
                <div class="remark-line"></div>
                <div class="remark-line"></div>

              </div>


              <div class="remark-box">

                <div class="remark-title">
                  PRINCIPAL / HEADMASTER REMARK
                </div>

                <div class="remark-line"></div>
                <div class="remark-line"></div>
                <div class="remark-line"></div>

              </div>

            </div>


            <div class="signature-row">

              <div class="signature">
                Class Teacher
              </div>

              <div class="signature">
                Principal / Headmaster
              </div>

            </div>

          </div>


          <div>

            <div class="position-box">

              <div>
                POSITION
              </div>

              <div class="position-value">

                ${
                  positionDone &&
                  student.position
                    ? ordinal(
                        student.position
                      )
                    : "—"
                }

              </div>

            </div>


            <table class="grading">

              <thead>

                <tr>

                  <th>
                    SCORE
                  </th>

                  <th>
                    GRADE
                  </th>

                  <th>
                    REMARK
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>80 - 100</td>
                  <td>A</td>
                  <td>Excellent</td>
                </tr>

                <tr>
                  <td>70 - 79</td>
                  <td>B</td>
                  <td>Very Good</td>
                </tr>

                <tr>
                  <td>60 - 69</td>
                  <td>C</td>
                  <td>Good</td>
                </tr>

                <tr>
                  <td>50 - 59</td>
                  <td>D</td>
                  <td>Fair</td>
                </tr>

                <tr>
                  <td>0 - 49</td>
                  <td>E</td>
                  <td>Poor</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>


        <div class="footer">

          ${escapeHTML(
            settings.schoolName ||
            "My School"
          )}

          —

          Student Result Management System

          <br>

          Printed on:
          ${new Date().toLocaleDateString()}

        </div>

      </div>

    `;


    openPrintWindow(
      html,
      student.name +
      " - Student Report",
      "portrait"
    );
}


  /* =========================================================
     PRINT CURRENT CLASS PREVIEW
  ========================================================= */

  function printCurrentReport() {

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


    printClassReport();
  }


  /* =========================================================
     CLEAR DATA
  ========================================================= */

  function clearAllData() {

    const confirmed =
      confirm(
        "Are you sure you want to clear ALL student and subject data?\n\nThis action cannot be undone."
      );


    if (!confirmed) {
      return;
    }


    students = [];

    subjects = [];


    calculationDone =
      false;

    positionDone =
      false;


    saveData();

    updateDashboard();

    renderReport();


    showMessage(
      "Data Cleared",
      "All student and subject data has been removed.",
      "success"
    );
  }


  /* =========================================================
     LOGOUT
  ========================================================= */

  function logout() {

    const confirmed =
      confirm(
        "Do you want to logout?"
      );


    if (!confirmed) {
      return;
    }


    showMessage(
      "Logout",
      "You have been logged out of this session.",
      "info"
    );
  }


  /* =========================================================
     MENU EVENTS
  ========================================================= */

  const dashboardMenu =
    document.getElementById(
      "dashboardMenu"
    );

  const studentsMenu =
    document.getElementById(
      "studentsMenu"
    );

  const subjectsMenu =
    document.getElementById(
      "subjectsMenu"
    );

  const resultsMenu =
    document.getElementById(
      "resultsMenu"
    );

  const averageMenu =
    document.getElementById(
      "averageMenu"
    );

  const positionMenu =
    document.getElementById(
      "positionMenu"
    );

  const settingsMenu =
    document.getElementById(
      "settingsMenu"
    );

  const logoutBtn =
    document.getElementById(
      "logoutBtn"
    );


  if (dashboardMenu) {

    dashboardMenu.addEventListener(
      "click",
      function () {

        closeMenu();

        window.scrollTo({
          top:0,
          behavior:"smooth"
        });

      }
    );
  }


  if (studentsMenu) {

    studentsMenu.addEventListener(
      "click",
      showStudentsList
    );
  }


  if (subjectsMenu) {

    subjectsMenu.addEventListener(
      "click",
      showSubjectsList
    );
  }


  if (resultsMenu) {

    resultsMenu.addEventListener(
      "click",
      function () {

        closeMenu();

        document
          .getElementById(
            "reportSection"
          )
          ?.scrollIntoView({
            behavior:"smooth"
          });

      }
    );
  }


  if (averageMenu) {

    averageMenu.addEventListener(
      "click",
      toggleAverage
    );
  }


  if (positionMenu) {

    positionMenu.addEventListener(
      "click",
      makePosition
    );
  }


  if (settingsMenu) {

    settingsMenu.addEventListener(
      "click",
      openSetupModal
    );
  }


  if (logoutBtn) {

    logoutBtn.addEventListener(
      "click",
      logout
    );
  }


  /* =========================================================
     QUICK ACTION EVENTS
  ========================================================= */

  if (addStudentBtn) {

    addStudentBtn.addEventListener(
      "click",
      addStudent
    );
  }


  if (addSubjectBtn) {

    addSubjectBtn.addEventListener(
      "click",
      addSubject
    );
  }


  if (calculateBtn) {

    calculateBtn.addEventListener(
      "click",
      calculateMarks
    );
  }


  if (positionBtn) {

    positionBtn.addEventListener(
      "click",
      makePosition
    );
  }


  if (printReportBtn) {

    printReportBtn.addEventListener(
      "click",
      printCurrentReport
    );
  }


  if (downloadPdfBtn) {

    downloadPdfBtn.addEventListener(
      "click",
      openDownloadOptions
    );
  }


  if (clearDataBtn) {

    clearDataBtn.addEventListener(
      "click",
      clearAllData
    );
  }


  /* =========================================================
     AVERAGE QUICK BUTTON
  ========================================================= */

  const averageButton =
    document.getElementById(
      "addAverageBtn"
    );


  if (averageButton) {

    averageButton.addEventListener(
      "click",
      toggleAverage
    );
  }


  /* =========================================================
     FIRST TIME SETUP
  ========================================================= */

  if (
    !settings.schoolName ||
    !settings.teacherName ||
    !settings.className
  ) {

    setTimeout(
      function () {

        openSetupModal();

      },
      500
    );
  }


  /* =========================================================
     START APP
  ========================================================= */

  updateDashboard();

  updateAverageButton();

  renderReport();

});  
