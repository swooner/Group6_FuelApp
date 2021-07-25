import { _id } from "./utilities/helper.js";
import { slider } from "./UX/slider.js";
import { loginUser } from "./features/login.js";
import { signupUser } from "./features/signup.js";
import { hamburgerHandler } from './UX/hamburger.js';
import { changePageHandler } from './UX/pageChange.js';
import { pageTilt } from './UX/errorPage.js';
import { resetPassword } from "./features/resetPassword.js";
import { dropdownMenuHandler, dropdownMenuActionHandler } from "./UX/dropdown.js";
import { renderChart } from "./UI/chart.js";
import { filterButtonHandler } from "./UX/filter.js";
import { requestFuelHandler } from "./UX/requestFuel.js";
import { logoutHandler } from "./features/logout.js";
import { updateUserInfoHandler } from "./features/updateUserInformation.js";

const signInBtn = _id("signInBtn");
const signUpBtn = _id("signUpBtn");

if (signInBtn || signUpBtn) {

    signInBtn.disabled = true;
    signUpBtn.disabled = true;
}

