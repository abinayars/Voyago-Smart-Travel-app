const expenseTableBody = document.getElementById("expenseTableBody");

const totalBudget = document.getElementById("totalBudget");
const spentAmount = document.getElementById("spentAmount");
const remainingAmount = document.getElementById("remainingAmount");
const savingPercent = document.getElementById("savingPercent");

const budgetProgress = document.getElementById("budgetProgress");

const expenseModal = document.getElementById("expenseModal");

const expenseCategory = document.getElementById("expenseCategory");
const expenseDescription = document.getElementById("expenseDescription");
const expenseAmount = document.getElementById("expenseAmount");

const saveExpenseBtn = document.getElementById("saveExpenseBtn");

let expenses = [];

const TOTAL_BUDGET = 50000;
function openExpenseModal() {

    expenseModal.style.display = "flex";

}

function closeExpenseModal() {

    expenseModal.style.display = "none";

}
function updateSummary() {

    let spent = 0;

    expenses.forEach(expense => {

        spent += Number(expense.amount);

    });

    const remaining = TOTAL_BUDGET - spent;

    const saving = Math.round((remaining / TOTAL_BUDGET) * 100);

    totalBudget.textContent = "₹" + TOTAL_BUDGET;
    spentAmount.textContent = "₹" + spent;
    remainingAmount.textContent = "₹" + remaining;
    savingPercent.textContent = saving + "%";

    budgetProgress.style.width = (spent / TOTAL_BUDGET) * 100 + "%";
    budgetProgress.textContent = Math.round((spent / TOTAL_BUDGET) * 100) + "%";

}
function renderExpenses() {

    expenseTableBody.innerHTML = "";

    expenses.forEach((expense, index) => {

        expenseTableBody.innerHTML += `

        <tr>

            <td>${expense.category}</td>

            <td>${expense.description}</td>

            <td>${expense.date}</td>

            <td>₹${expense.amount}</td>

            <td>
           <button onclick="deleteExpense(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    updateSummary();

}  
saveExpenseBtn.addEventListener("click", () => {

    const expense = {

        category: expenseCategory.value,
        description: expenseDescription.value,
        amount: expenseAmount.value,
        date: new Date().toLocaleDateString()

    };

    expenses.push(expense);

    renderExpenses();

    expenseCategory.value = "";
    expenseDescription.value = "";
    expenseAmount.value = "";

    closeExpenseModal();
});

function deleteExpense(index) {

    expenses.splice(index, 1);

    renderExpenses();

}

// Initialize
updateSummary();