$(document).ready(function() {
    //window.jsPDF = window.jspdf.jsPDF

    $("#elrondSelectNR").change(function() {
        $(".card-deck").empty();

        var selected = $(this).val();
        var nrPunks = selected;
        console.log(elrondSelectNR);
        var arrOfPunks = [];
        while (arrOfPunks.length < nrPunks) {
            var r = Math.floor(Math.random() * 3141) + 1;
            if (arrOfPunks.indexOf(r) === -1) arrOfPunks.push(r);
            console.log(r);
        }

        arrOfPunks.forEach(function(number) {
            var finalUrl =
                "https://firebasestorage.googleapis.com/v0/b/crypto-punk.appspot.com/o/fullSize%2F%23" +
                number +
                ".png?alt=media&token=4970c03e-39e0-4e53-8a06-fc31cd7faa6a";

            $(".card-deck").append(
                "<div class='punk-card' style='width: 18rem;'><img class='card-img-top' src='" +
                finalUrl +
                "' alt='Card image cap' crossorigin></div>"
            );

            console.log("");
        });
    });

    $(".generate-pdf").click(function() {
        html2canvas(document.querySelector(".card-deck"), {
            useCORS: true,
            onrendered: function(canvas) {},
        }).then(function(canvas) {
            console.log(canvas);
            simulateDownloadImageClick(canvas.toDataURL(), "punks.png");
        });
    });

    function simulateDownloadImageClick(uri, filename) {
        var link = document.createElement("a");
        if (typeof link.download !== "string") {
            window.open(uri);
        } else {
            link.href = uri;
            link.download = filename;
            accountForFirefox(clickLink, link);
        }
    }

    function clickLink(link) {
        link.click();
    }

    function accountForFirefox(click) {
        // wrapper function
        let link = arguments[1];
        document.body.appendChild(link);
        click(link);
        document.body.removeChild(link);
    }
});