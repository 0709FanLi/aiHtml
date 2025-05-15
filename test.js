function clearFormInputsExcept(formElement, exceptIds = []) {
  if (!formElement) return;
  const inputs = formElement.querySelectorAll("input");
  inputs.forEach((input) => {
    if (!exceptIds.includes(input.id)) {
      input.value = "";
    }
    input.classList.remove("is-invalid");
  });
}
