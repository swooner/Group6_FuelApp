export const slider = () => {
  const signUpBtn = document.getElementById("signUp");
  const signInBtn = document.getElementById("signIn");
  const container = document.getElementById("container");

  if (signUpBtn || signInBtn) {
    signUpBtn.addEventListener("click", () => {
      container.classList.add("rightPanel--active");
    });
    signInBtn.addEventListener("click", () => {
      container.classList.remove("rightPanel--active");
    });
  };
};
slider();
