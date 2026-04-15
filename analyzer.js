async function analyze() {
    const file = document.getElementById("file").files[0];
    const role = document.getElementById("role").value;
    const manual = document.getElementById("manualText").value;

    // 🔥 PRIORITY: MANUAL INPUT
    if (manual && manual.trim().length > 50) {
        localStorage.setItem("resumeText", manual.toLowerCase());
        localStorage.setItem("role", role);
        window.location.href = "result.html";
        return;
    }

    if (!file) {
        alert("Upload a resume or paste text");
        return;
    }

    document.getElementById("loader").style.display = "flex";

    const reader = new FileReader();

    reader.onload = async function () {

        setTimeout(async () => {

            const typedarray = new Uint8Array(this.result);
            const pdf = await pdfjsLib.getDocument(typedarray).promise;

            let text = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                let page = await pdf.getPage(i);
                let content = await page.getTextContent();

                content.items.forEach(item => {
                    text += item.str + " ";
                });
            }

            localStorage.setItem("resumeText", text.toLowerCase());
            localStorage.setItem("role", role);

            window.location.href = "result.html";

        }, 2000);
    };

    reader.readAsArrayBuffer(file);
}