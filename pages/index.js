import { useState } from "react";

export default function Home() {
  const [semesters, setSemesters] = useState([{ sgpa: "", credit: "" }]);

  const [defenseYes, setDefenseYes] = useState(false);
  const [defenseSGPA, setDefenseSGPA] = useState("");
  const [defenseCredit, setDefenseCredit] = useState("");

  // Add Semester
  const addSemester = () => {
    setSemesters([...semesters, { sgpa: "", credit: "" }]);
  };

  // Remove Semester
  const removeSemester = (index) => {
    const updated = semesters.filter((_, i) => i !== index);
    setSemesters(updated);
  };

  // Update Semester Input
  const updateSemester = (index, field, value) => {
    const updated = [...semesters];
    updated[index][field] = value;
    setSemesters(updated);
  };

  // Weighted CGPA Calculation
  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach((sem) => {
      const sgpa = parseFloat(sem.sgpa);
      const credit = parseFloat(sem.credit);

      if (!isNaN(sgpa) && !isNaN(credit)) {
        totalPoints += sgpa * credit;
        totalCredits += credit;
      }
    });

    // Add Defense if included
    if (defenseYes) {
      const dSGPA = parseFloat(defenseSGPA);
      const dCredit = parseFloat(defenseCredit);

      if (!isNaN(dSGPA) && !isNaN(dCredit)) {
        totalPoints += dSGPA * dCredit;
        totalCredits += dCredit;
      }
    }

    if (totalCredits === 0) return "0.00";

    return (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎓 DIU CGPA Calculator</h1>

      {/* Semester Inputs */}
      {semesters.map((sem, index) => (
        <div key={index} style={styles.card}>
          <h3 style={styles.semTitle}>Semester {index + 1}</h3>

          <input
            type="number"
            step="0.01"
            placeholder="Enter Semester SGPA"
            value={sem.sgpa}
            onChange={(e) => updateSemester(index, "sgpa", e.target.value)}
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Enter Semester Credit"
            value={sem.credit}
            onChange={(e) => updateSemester(index, "credit", e.target.value)}
            style={styles.input}
          />

          {semesters.length > 1 && (
            <button
              onClick={() => removeSemester(index)}
              style={styles.removeBtn}
            >
              ❌ Remove Semester
            </button>
          )}
        </div>
      ))}

      <button onClick={addSemester} style={styles.addBtn}>
        ➕ Add Another Semester
      </button>

      {/* Defense Section */}
      <div style={styles.defenseBox}>
        <h2 style={styles.defTitle}>Do you want to add Final Defense Result?</h2>

        <select
          onChange={(e) => setDefenseYes(e.target.value === "yes")}
          style={styles.select}
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>

        {defenseYes && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="number"
              step="0.01"
              placeholder="Defense Result"
              value={defenseSGPA}
              onChange={(e) => setDefenseSGPA(e.target.value)}
              style={styles.input}
            />

            <input
              type="number"
              placeholder="Defense Credit"
              value={defenseCredit}
              onChange={(e) => setDefenseCredit(e.target.value)}
              style={styles.input}
            />
          </div>
        )}
      </div>

      {/* Result */}
      <div style={styles.resultBox}>
        <h2>📌 Final CGPA:</h2>
        <h1 style={styles.cgpa}>{calculateCGPA()}</h1>
        <p>(Out of 4.00)</p>
        <p style={styles.footer}>Developed by Shakil Mia</p>
      </div>
    </div>
  );
}

/* Styling */
const styles = {
  container: {
    fontFamily: "Arial",
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
  },

  title: {
    textAlign: "center",
    fontSize: "28px",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "gray",
  },

  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    background: "#fafafa",
  },

  semTitle: {
    marginBottom: "10px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid gray",
  },

  addBtn: {
    width: "100%",
    padding: "12px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },

  removeBtn: {
    width: "100%",
    padding: "8px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  defenseBox: {
    marginTop: "25px",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #ddd",
  },

  defTitle: {
    marginBottom: "10px",
  },

  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
  },

  resultBox: {
    marginTop: "30px",
    textAlign: "center",
    padding: "20px",
    background: "#f2f2f2",
    borderRadius: "15px",
  },

  cgpa: {
    fontSize: "45px",
    color: "green",
  },

  footer: {
    marginTop: "15px",
    fontSize: "14px",
    color: "gray",
  },
};
