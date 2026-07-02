const darkBtn = document.getElementById("darkBtn");

function loadTheme() {

    if (localStorage.getItem("darkMode") === "true") {

        document.body.classList.add("dark-mode");

    }

}

loadTheme();

if (darkBtn) {

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark-mode")
        );

    });

}

const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {

    copyBtn.addEventListener("click", async () => {

        try {

            const recipe = document.getElementById("recipeText").innerText;

            await navigator.clipboard.writeText(recipe);

            const original = copyBtn.innerHTML;

            copyBtn.innerHTML = "✅ Copied!";

            setTimeout(() => {

                copyBtn.innerHTML = original;

            }, 2000);

        }

        catch (err) {

            alert("Failed to copy recipe.");

        }

    });

}

document.querySelectorAll(".copy-btn").forEach(button => {

    button.addEventListener("click", async () => {

        try {

            const recipe = button.dataset.recipe;

            await navigator.clipboard.writeText(recipe);

            const original = button.innerHTML;

            button.innerHTML = "✅ Copied!";

            setTimeout(() => {

                button.innerHTML = original;

            }, 2000);

        }

        catch (err) {

            alert("Failed to copy recipe.");

        }

    });

});

const surpriseBtn = document.getElementById("surpriseBtn");

if (surpriseBtn) {

    surpriseBtn.addEventListener("click", async () => {

        try {

            const response = await fetch("/surprise");

            const data = await response.json();

            document.querySelector(
                "textarea[name='ingredients']"
            ).value = data.ingredients;

        }

        catch (err) {

            alert("Unable to fetch ingredients.");

        }

    });

}

setTimeout(() => {

    document.querySelectorAll(".alert").forEach(alert => {

        alert.classList.remove("show");

        setTimeout(() => {

            alert.remove();

        }, 300);

    });

}, 4000);


document.querySelectorAll(".delete-btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ok = confirm(
            "Are you sure you want to delete this recipe?"
        );

        if (!ok) {

            e.preventDefault();

        }

    });

});

window.scrollTo({

    top: 0,

    behavior: "smooth"

});