import { excluirCliente, cadastrarClientes, listarClientes } from "./utils.js";

const form = document.querySelector(".form-cadastro");

document.addEventListener("DOMContentLoaded", () => {
  listarClientes();''
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const nome = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  
  if (!nome.trim() || !email.trim() && !email.includes("@")) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  cadastrarClientes(nome, email);
  
  form.reset();
});

window.excluirCliente = excluirCliente;
