const cuentas = [
  { nombre: "Rogelio", saldo: 200 },
  { nombre: "Stiven", saldo: 350 },
  { nombre: "Yaxche", saldo: 500 }
];

let selectedAccountIndex = null;

const mostrarError = (mensaje) => {
  document.getElementById("login-error").textContent = mensaje;
};

const mostrarSaldo = () => {
  const balanceDisplay = document.getElementById("balance-display");
  balanceDisplay.textContent = `Saldo actual: $${cuentas[selectedAccountIndex].saldo}`;
};

const ingresarMonto = () => {
  const depositInput = document.getElementById("deposit-input");
  const depositAmount = parseInt(depositInput.value);

  if (isNaN(depositAmount)) {
    document.getElementById("deposit-result").textContent = "Por favor, ingrese un monto válido.";
    return;
  }

  const account = cuentas[selectedAccountIndex];
  const newBalance = account.saldo + depositAmount;

  if (newBalance > 990) {
    document.getElementById("deposit-result").textContent = "El saldo no puede ser mayor a $990.";
    return;
  }

  account.saldo = newBalance;
  document.getElementById("deposit-result").textContent = `Monto ingresado: $${depositAmount}, Nuevo saldo: $${newBalance}`;
  mostrarSaldo();
};

const retirarMonto = () => {
  const withdrawInput = document.getElementById("withdraw-input");
  const withdrawAmount = parseInt(withdrawInput.value);

  if (isNaN(withdrawAmount)) {
    document.getElementById("withdraw-result").textContent = "Por favor, ingrese un monto válido.";
    return;
  }

  const account = cuentas[selectedAccountIndex];
  const newBalance = account.saldo - withdrawAmount;

  if (newBalance < 10) {
    document.getElementById("withdraw-result").textContent = "El saldo no puede ser menor a $10.";
    return;
  }

  account.saldo = newBalance;
  document.getElementById("withdraw-result").textContent = `Monto retirado: $${withdrawAmount}, Nuevo saldo: $${newBalance}`;
  mostrarSaldo();
};

const mostrarCuentaSeleccionada = () => {
  const accountNameElement = document.getElementById("account-name");
  accountNameElement.textContent = cuentas[selectedAccountIndex].nombre;
};

const iniciarSesion = () => {
  const accountSelect = document.getElementById("account-select");
  const passwordInput = document.getElementById("password-input");

  const selectedAccount = parseInt(accountSelect.value);
  const password = passwordInput.value;

  if (password === "1234") {
    selectedAccountIndex = selectedAccount;
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("transaction-section").classList.remove("hidden");
    mostrarCuentaSeleccionada();
    mostrarSaldo();
  } else {
    mostrarError("Contraseña incorrecta. Intente nuevamente.");
  }
};

const cerrarSesion = () => {
  selectedAccountIndex = null;
  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("transaction-section").classList.add("hidden");
  document.getElementById("password-input").value = "";
  document.getElementById("login-error").textContent = "";
};

document.getElementById("login-btn").addEventListener("click", iniciarSesion);
document.getElementById("deposit-btn").addEventListener("click", ingresarMonto);
document.getElementById("withdraw-btn").addEventListener("click", retirarMonto);
document.getElementById("logout-btn").addEventListener("click", cerrarSesion);
