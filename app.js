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
/* ===================================================
     CALCULATE MARKS
     =================================================== */

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
          ></div>

        </div>
      `,
      "loading"
    );


    let progress = 0;


    const timer =
      setInterval(function () {

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

      }, 80);
  }


  /* ===================================================
     FINISH CALCULATION
     =================================================== */

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

 /* ===================================================
     MAKE POSITION
     =================================================== */

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
          ></div>

        </div>
      `,
      "loading"
    );


    let progress = 0;


    const timer =
      setInterval(function () {

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

      }, 80);
  }


  /* ===================================================
     FINISH POSITION
     =================================================== */

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
/* ===================================================
     RENDER REPORT
     =================================================== */

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
                  class="mark-input"
                  type="number"
                  min="0"
                  max="100"
                  value="${escapeHTML(mark)}"
                  data-student-id="${student.id}"
                  data-subject-id="${subject.id}"
                  inputmode="numeric"
                >

              </td>

            `;
          }
        );


        html += `

            <td>
              <strong>
                ${
                  calculationDone
                    ? Number(
                        student.total || 0
                      )
                    : "—"
                }
              </strong>
            </td>

        `;


        if (averageEnabled) {

          html += `

            <td>
              <strong>
                ${
                  calculationDone
                    ? Number(
                        student.average || 0
                      ).toFixed(2)
                    : "—"
                }
              </strong>
            </td>

          `;
        }


        html += `

            <td>
              <strong>
                ${
                  positionDone
                    ? student.position
                    : "—"
                }
              </strong>
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


    connectMarkInputs();
  }
/* ===================================================
     CONNECT MARK INPUTS
     =================================================== */

  function connectMarkInputs() {

    if (!reportPreview) {
      return;
    }


    const inputs =
      reportPreview.querySelectorAll(
        ".mark-input"
      );


    inputs.forEach(
      function (input) {

        input.addEventListener(
          "input",
          function () {

            const studentId =
              input.dataset.studentId;


            const subjectId =
              input.dataset.subjectId;


            const student =
              students.find(
                function (item) {

                  return String(
                    item.id
                  ) === String(
                    studentId
                  );
                }
              );


            if (!student) {
              return;
            }


            if (!student.marks) {
              student.marks = {};
            }


            if (input.value === "") {

              student.marks[
                subjectId
              ] = "";

            } else {

              let value =
                Number(
                  input.value
                );


              if (
                !Number.isFinite(value)
              ) {

                value = 0;
              }


              value =
                Math.max(
                  0,
                  Math.min(
                    100,
                    value
                  )
                );


              input.value =
                value;


              student.marks[
                subjectId
              ] = value;
            }


            calculationDone = false;

            positionDone = false;


            student.total = 0;

            student.average = 0;

            student.position = null;


            saveData();

            updateDashboard();
          }
        );
      }
    );
          }
