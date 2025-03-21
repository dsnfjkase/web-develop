document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit").addEventListener("click", function () {
        const stockSymbol = document.getElementById("stockname").value.trim().toUpperCase();
        const apiKey = "VY7GEBZ3ALQIPTKN"; 
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`;

        if (stockSymbol === "") {
            alert("Please enter a stock symbol.");
            return;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const timeSeries = data["Time Series (Daily)"];
                if (!timeSeries) {
                    document.getElementById("quote").value = "Error: Invalid stock symbol or API limit reached.";
                    return;
                }

                let output = `Stock Symbol: ${stockSymbol}\n\nLast 5 Days Data:\n`;

                const dates = Object.keys(timeSeries).slice(0, 5);
                dates.forEach(date => {
                    const dayData = timeSeries[date];
                    output += `Date: ${date}\n`;
                    output += `Open: ${dayData["1. open"]}\n`;
                    output += `High: ${dayData["2. high"]}\n`;
                    output += `Low: ${dayData["3. low"]}\n`;
                    output += `Close: ${dayData["4. close"]}\n`;
                    output += `Volume: ${dayData["5. volume"]}\n`;
                    output += `---------------------\n`;
                });

                document.getElementById("quote").value = output;
            })
            .catch(error => {
                console.error("Error fetching stock data:", error);
                document.getElementById("quote").value = "Error fetching data. Check the console for details.";
            });
    });
});