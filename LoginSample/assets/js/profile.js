function printProfile(){
    // Add an event listener to the button
    document.getElementById('printButton').addEventListener('click', () => {

        const element = document.getElementById('profile-overview'); // Replace with your element ID

        // Create a canvas from the HTML element
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('assets/img/default.jpeg');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; // Adjust the width as needed
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

            // Open the PDF in a new tab for preview
            const pdfDataUri = pdf.output('datauristring');
            const newTab = window.open();
            newTab.document.write('<iframe width="100%" height="100%" src="' + pdfDataUri + '"></iframe>');

        // Automatically trigger the print dialog in the new tab
            newTab.onload = function () {
            newTab.focus();
            newTab.print();
        };

        });
    });
};

printProfile();