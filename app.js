/* =====================================================
   MY STUDENT
   STUDENT RESULT MANAGEMENT SYSTEM
   COMPLETE APP.JS
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     DATA
  ===================================================== */

  let students =
    JSON.parse(localStorage.getItem("myStudents")) || [];

  let subjects =
    JSON.parse(localStorage.getItem("mySubjects")) || [];

  let calculationDone =
    localStorage.getItem("calculationDone") === "true";

  let positionDone =
    localStorage.getItem("positionDone") === "true";

  /*
     Average is OPTIONAL.

     Default:
     Average = OFF

     If the user turns it ON before calculation,
     Average will be calculated and shown.
  */

  let averageEnabled =
    localStorage.getItem("averageEnabled") === "true";


  /* =====================================================
     ELEMENTS
  ===================================================== */

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


  /* =====================================================
     SAVE DATA
  ===================================================== */

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


  /* =====================================================
     ESCAPE HTML
  ===================================================== */

  function escapeHTML(value) {

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* =====================================================
     DASHBOARD
  ===================================================== */

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


  /* =====================================================
     ACTION MESSAGE
  ===================================================== */

  function showActionMessage(
    title,
    message,
    type = "success"
  ) {

    const quickCard =
      document.querySelector(
        ".quick-actions-card"
      );

    if (!quickCard) return;


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
      "quick-action-message " + type;


    let icon = "✓";


    if (type === "warning") {
      icon = "⚠️";
    }

    if (type === "loading") {
      icon = "⏳";
    }

    if (type === "info") {
      icon = "📊";
    }


    box.innerHTML = `

      <div class="success-animation">

        <div class="success-icon">
          ${icon}
        </div>

        <div class="action-message-title">
          ${title}
        </div>

        <div class="action-message-text">
          ${message}
        </div>

      </div>

    `;


    if (type !== "loading") {

      setTimeout(() => {

        if (box &&
            box.parentNode) {

          box.remove();
        }

      }, 4000);
    }

/* =====================================================
     INPUT MODAL
  ===================================================== */

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
      closeBtn.onclick =
        closeModal;
    }


    if (cancelBtn) {
      cancelBtn.onclick =
        closeModal;
    }


    if (saveBtn) {

      saveBtn.onclick = () => {

        const value =
          input.value.trim();


        if (!value) {

          input.focus();

          return;
        }


        callback(value);

        closeModal();
      };
    }


    if (input) {

      input.addEventListener(
        "keydown",
        event => {

          if (event.key === "Enter") {

            event.preventDefault();

            if (saveBtn) {
              saveBtn.click();
            }
          }


          if (event.key === "Escape") {

            closeModal();
          }

        }
      );
    }


    setTimeout(() => {

      if (input) {
        input.focus();
      }

    }, 100);
  }


  /* =====================================================
     ADD STUDENT
  ===================================================== */

  function addStudent() {

    openInputModal(
      "Add Student",
      "Student Name",
      "Enter student name",
      name => {

        const cleanName =
          name.trim();


        const exists =
          students.some(
            student =>
              String(student.name)
                .toLowerCase() ===
              cleanName.toLowerCase()
          );


        if (exists) {

          showActionMessage(
            "Student Already Exists",
            escapeHTML(cleanName),
            "warning"
          );

          return;
        }


        students.push({

          id:
            Date.now() +
            Math.random(),

          name:
            cleanName,

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
            ${escapeHTML(cleanName)}
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


  /* =====================================================
     ADD SUBJECT
  ===================================================== */

  function addSubject() {

    openInputModal(
      "Add Subject",
      "Subject Name",
      "Enter subject name",
      name => {

        const cleanName =
          name.trim();


        const exists =
          subjects.some(
            subject =>
              String(subject.name)
                .toLowerCase() ===
              cleanName.toLowerCase()
          );


        if (exists) {

          showActionMessage(
            "Subject Already Exists",
            escapeHTML(cleanName),
            "warning"
          );

          return;
        }


        subjects.push({

          id:
            Date.now() +
            Math.random(),

          name:
            cleanName

        });


        calculationDone = false;

        positionDone = false;


        saveData();

        updateDashboard();

        renderReport();


        showActionMessage(
          "Subject Added Successfully",
          escapeHTML(cleanName),
          "success"
        );
      }
    );
  }


  /* =====================================================
     AVERAGE OPTION BUTTON
  ===================================================== */
function createAverageButton() {

    const actionGrid =
      document.querySelector(
        ".action-grid"
      );


    if (!actionGrid) {
      return;
    }


    /*
       Don't create duplicate button.
    */

    let averageBtn =
      document.getElementById(
        "averageOptionBtn"
      );


    if (!averageBtn) {

      averageBtn =
        document.createElement("button");


      averageBtn.type =
        "button";


      averageBtn.id =
        "averageOptionBtn";


      averageBtn.className =
        "action-btn";


      actionGrid.appendChild(
        averageBtn
      );
    }


    updateAverageButton();


    averageBtn.onclick =
      toggleAverage;
  }


  /* =====================================================
     UPDATE AVERAGE BUTTON
  ===================================================== */

  function updateAverageButton() {

    const button =
      document.getElementById(
        "averageOptionBtn"
      );


    if (!button) {
      return;
    }


    if (averageEnabled) {

      button.innerHTML = `

        <span class="icon">
          📊
        </span>

        <span>
          Average: ON
        </span>

      `;

    } else {

      button.innerHTML = `

        <span class="icon">
          📊
        </span>

        <span>
          Add Average
        </span>

      `;
    }
  }


  /* =====================================================
     TOGGLE AVERAGE
  ===================================================== */

  function toggleAverage() {

    averageEnabled =
      !averageEnabled;


    /*
       Changing the Average option
       means calculation should be
       performed again.
    */

    calculationDone = false;

    positionDone = false;


    students.forEach(
      student => {

        student.average =
          0;

        student.position =
          null;
      }
    );


    saveData();

    updateDashboard();

    renderReport();

    updateAverageButton();


    if (averageEnabled) {

      showActionMessage(
        "Average Enabled",
        "Average will be included in the student results.",
        "success"
      );

    } else {

      showActionMessage(
        "Average Disabled",
        "Average will not be included in the student results.",
        "info"
      );
    }
  }


  /* =====================================================
     CALCULATE RESULTS
  ===================================================== */

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

      calculateBtn.disabled =
        true;
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

        <div
          style="
            margin-top:7px;
            font-size:12px;
          "
        >
          Please wait...
        </div>
      `,
      "loading"
    );


    let progress = 0;


    const timer =
      setInterval(() => {

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

      }, 70);
  }


  /* =====================================================
     FINISH CALCULATION
  ===================================================== */

  function finishCalculation() {

    students.forEach(
      student => {

        let total = 0;

        let count = 0;


        if (!student.marks) {

          student.marks = {};
        }


        subjects.forEach(
          subject => {

            const raw =
              student.marks[
                subject.id
              ];


            /*
               Empty mark = 0
               for total calculation.
            */

            if (
              raw === "" ||
              raw === null ||
              raw === undefined
            ) {

              return;
            }


            const value =
              Number(raw);


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


        /*
           Average is calculated ONLY
           when Average option is ON.
        */

        if (averageEnabled) {

          student.average =
            count > 0
              ? total / count
              : 0;

        } else {

          student.average =
            0;
        }


        student.position =
          null;
      }
    );


    calculationDone =
      true;


    positionDone =
      false;


    saveData();

    updateDashboard();

    renderReport();


    showActionMessage(
      "Results Calculated Successfully",
      averageEnabled
        ? "Total and Average have been calculated successfully."
        : "Student totals have been calculated successfully.",
      "success"
    );


    if (calculateBtn) {

      calculateBtn.disabled =
        false;
    }
  }


  /* =====================================================
     MAKE POSITION
  ===================================================== */

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
        "Please calculate the student results before making positions.",
        "warning"
      );

      return;
    }


    if (positionBtn) {

      positionBtn.disabled =
        true;
    }


    showActionMessage(
      "Calculating Positions...",
      `
        Please wait while the system
        calculates student positions.

        <div class="calculation-bar">

          <div
            class="calculation-progress"
            id="positionProgress"
          ></div>

        </div>

        <div
          style="
            margin-top:7px;
            font-size:12px;
          "
        >
          Please wait...
        </div>
      `,
      "loading"
    );


    let progress = 0;


    const timer =
      setInterval(() => {

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

      }, 70);
  }


  /* =====================================================
     FINISH POSITION
  ===================================================== */ 

function finishPosition() {

    const sorted =
      [...students].sort(
        (a, b) =>
          Number(b.total || 0) -
          Number(a.total || 0)
      );


    let currentPosition =
      0;


    let previousTotal =
      null;


    sorted.forEach(
      (student, index) => {

        const total =
          Number(student.total || 0);


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


    /*
       Keep the original student
       array order.
    */

    students =
      students.map(
        original => {

          const updated =
            sorted.find(
              item =>
                item.id ===
                original.id
            );


          return updated ||
            original;
        }
      );


    positionDone =
      true;


    saveData();

    updateDashboard();

    renderReport();


    showActionMessage(
      "Positions Completed Successfully",
      "Student positions have been calculated successfully.",
      "success"
    );


    if (positionBtn) {

      positionBtn.disabled =
        false;
    }
  }


  /* =====================================================
     RENDER REPORT
  ===================================================== */

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

              <th>
                S/N
              </th>

              <th>
                Student Name
              </th>

    `;


    subjects.forEach(
      subject => {

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

              <th>
                Total
              </th>

    `;


    /*
       Average column appears ONLY
       when Average is enabled.
    */

    if (averageEnabled) {

      html += `

              <th>
                Average
              </th>

      `;
    }


    html += `

              <th>
                Position
              </th>

            </tr>

          </thead>

          <tbody>

    `;


    students.forEach(
      (student, index) => {

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
          subject => {

            let mark = "";


            if (
              student.marks &&
              student.marks[
                subject.id
              ] !== undefined
            ) {

              mark =
                student.marks[
                  subject.id
                ];
            }


            html += `

              <td>

                <input
                  class="mark-input"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value="${escapeHTML(mark)}"
                  data-student-id="${student.id}"
                  data-subject-id="${subject.id}"
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
                      ).toFixed(2)
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


  /* =====================================================
     MARK INPUTS
  ===================================================== */

  function connectMarkInputs() {

    if (!reportPreview) {
      return;
    }


    const inputs =
      reportPreview.querySelectorAll(
        ".mark-input"
      );


    inputs.forEach(
      input => {

        input.addEventListener(
          "input",
          () => {

            const studentId =
              Number(
                input.dataset.studentId
              );


            const subjectId =
              Number(
                input.dataset.subjectId
              );


            const student =
              students.find(
                item =>
                  Number(item.id) ===
                  studentId
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


            /*
               Any mark change means
               old calculation and position
               are no longer valid.
            */

            calculationDone =
              false;


            positionDone =
              false;


            student.total =
              0;


            student.average =
              0;


            student.position =
              null;


            saveData();

            updateDashboard();
          }
        );
      }
    );
  }


  /* =====================================================
     CLEAR DATA WARNING
  ===================================================== */

  function showClearWarning() {

    const oldModal =
      document.getElementById(
        "clearDataModal"
      );


    if (oldModal) {
      oldModal.remove();
    }


    const modal =
      document.createElement("div");


    modal.id =
      "clearDataModal";


    modal.className =
      "modal";


    modal.innerHTML = `

      <div class="modal-content">

        <div class="modal-header">

          <h3>
            Clear All Data
          </h3>

          <button
            type="button"
            class="modal-close"
            id="closeClearModal"
          >
            ×
          </button>

        </div>


        <div
          style="
            text-align:center;
            padding:8px 0 10px;
          "
        >

          <div
            style="
              font-size:45px;
              margin-bottom:10px;
            "
          >
            ⚠️
          </div>


          <h3
            style="
              color:#dc3545;
              margin-bottom:8px;
            "
          >
            Are you sure?
          </h3>


          <p
            style="
              color:#687583;
              font-size:14px;
              line-height:1.6;
            "
          >
            This will permanently delete
            all students, subjects, marks,
            calculations and positions
            saved on this device.
          </p>

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
            id="cancelClearData"
            style="flex:1;"
          >
            Cancel
          </button>


          <button
            type="button"
            class="btn btn-danger"
            id="confirmClearData"
            style="flex:1;"
          >
            Yes, Clear All
          </button>

        </div>

      </div>

    `;


    document.body.appendChild(
      modal
    );


    const closeBtn =
      document.getElementById(
        "closeClearModal"
      );


    const cancelBtn =
      document.getElementById(
        "cancelClearData"
      );


    const confirmBtn =
      document.getElementById(
        "confirmClearData"
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
      closeBtn.onclick =
        closeModal;
    }


    if (cancelBtn) {
      cancelBtn.onclick =
        closeModal;
    }


    if (confirmBtn) {

      confirmBtn.onclick = () => {

        clearAllData();

        closeModal();
      };
    }
  }


  /* =====================================================
     CLEAR ALL DATA
  ===================================================== */
  function clearAllData() {

    students = [];

    subjects = [];

    calculationDone =
      false;

    positionDone =
      false;

    averageEnabled =
      false;


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


    updateDashboard();

    updateAverageButton();

    renderReport();


    showActionMessage(
      "All Data Cleared",
      "All student and result data has been removed successfully.",
      "success"
    );
  }


  /* =====================================================
     PRINT REPORT
  ===================================================== */

  function printReport() {

    if (
      students.length === 0 ||
      subjects.length === 0
    ) {

      showActionMessage(
        "Report Not Ready",
        "Please add students and subjects first.",
        "warning"
      );

      return;
    }


    if (!calculationDone) {

      showActionMessage(
        "Calculate Results First",
        "Please calculate the results before printing.",
        "warning"
      );

      return;
    }


    window.print();
  }


  /* =====================================================
     DOWNLOAD PDF
  ===================================================== */

  function downloadPDF() {

    if (
      students.length === 0 ||
      subjects.length === 0
    ) {

      showActionMessage(
        "Report Not Ready",
        "Please add students and subjects first.",
        "warning"
      );

      return;
    }


    if (!calculationDone) {

      showActionMessage(
        "Calculate Results First",
        "Please calculate the results before downloading the report.",
        "warning"
      );

      return;
    }


    /*
       If jsPDF is installed in the future,
       we can connect a real PDF generator.

       For now we use the browser's
       professional print-to-PDF system.
    */

    showActionMessage(
      "Preparing PDF...",
      "Please wait. The print window will open so you can select Save as PDF.",
      "loading"
    );


    setTimeout(() => {

      window.print();

    }, 700);
  }


  /* =====================================================
     BUTTON CONNECTIONS
  ===================================================== */

  function connectButtons() {

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
        printReport
      );
    }


    if (downloadPdfBtn) {

      downloadPdfBtn.addEventListener(
        "click",
        downloadPDF
      );
    }


    if (clearDataBtn) {

      clearDataBtn.addEventListener(
        "click",
        showClearWarning
      );
    }
  }


  /* =====================================================
     INITIALIZE APP
  ===================================================== */

  connectButtons();

  createAverageButton();

  updateDashboard();

  renderReport();


  /* =====================================================
     FINAL READY
  ===================================================== */

  console.log(
    "My Student application loaded successfully."
  );

});
