use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* ===================================================
     DATA
     =================================================== */

  let students =
    JSON.parse(localStorage.getItem("myStudents")) || [];

  let subjects =
    JSON.parse(localStorage.getItem("mySubjects")) || [];

  let calculationDone =
    localStorage.getItem("calculationDone") === "true";

  let positionDone =
    localStorage.getItem("positionDone") === "true";

  let averageEnabled =
    localStorage.getItem("averageEnabled") === "true";


  /* ===================================================
     GET ELEMENTS
     =================================================== */

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

  const reportPreview =
    document.getElementById("reportPreview");

  const printReportBtn =
    document.getElementById("printReportBtn");

  const downloadPdfBtn =
    document.getElementById("downloadPdfBtn");

  const clearDataBtn =
    document.getElementById("clearDataBtn");


  /* ===================================================
     SAVE DATA
     =================================================== */

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
  }


  /* ===================================================
     ESCAPE HTML
     =================================================== */

  function escapeHTML(value) {

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* ===================================================
     DASHBOARD UPDATE
     =================================================== */

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


  /* ===================================================
     MESSAGE SYSTEM
     =================================================== */

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
      quickCard.querySelector(
        ".quick-action-message"
      );


    if (!box) {

      box =
        document.createElement("div");

      box.className =
        "quick-action-message";

      quickCard.appendChild(box);
    }


    box.className =
      "quick-action-message " +
      type;


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

        if (box &&
            box.parentNode) {

          box.remove();
        }

      }, 4000);
    }
  }


  /* ===================================================
     INPUT MODAL
     Used by ADD STUDENT and ADD SUBJECT
     =================================================== */

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

      if (modal &&
          modal.parentNode) {

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


  /* ===================================================
     ADD STUDENT
     =================================================== */

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
            Math.random(),

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


  /* ===================================================
     ADD SUBJECT
     =================================================== */

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
            Math.random(),

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


  /* ===================================================
     ADD AVERAGE OPTION
     =================================================== */

  function createAverageButton() {

    const actionGrid =
      document.querySelector(
        ".action-grid"
      );


    if (!actionGrid) {
      return;
    }


    if (
      document.getElementById(
        "addAverageBtn"
      )
    ) {
      return;
    }


    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";

    button.id =
      "addAverageBtn";

    button.className =
      "action-btn";


    button.innerHTML = `

      <span class="icon">
        📊
      </span>

      <span>
        ${averageEnabled
          ? "Average: ON"
          : "Add Average"}
      </span>

    `;


    actionGrid.appendChild(
      button
    );


    button.addEventListener(
      "click",
      toggleAverage
    );
  }


  /* ===================================================
     AVERAGE ON / OFF
     =================================================== */

  function toggleAverage() {

    averageEnabled =
      !averageEnabled;


    saveData();

    renderReport();


    const button =
      document.getElementById(
        "addAverageBtn"
      );


    if (button) {

      const span =
        button.querySelector(
          "span:last-child"
        );


      if (span) {

        span.textContent =
          averageEnabled
            ? "Average: ON"
            : "Add Average";
      }
    }


    showActionMessage(
      averageEnabled
        ? "Average Enabled"
        : "Average Disabled",
      averageEnabled
        ? "Average will be included in the student results."
        : "Average will not be included in the student results.",
      "info"
    );
  }


  /* ===================================================
     INITIAL START
     =================================================== */

  createAverageButton();

  updateDashboard();

  renderReport();

});
