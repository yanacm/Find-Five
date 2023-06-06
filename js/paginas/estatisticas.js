const urlStats = "https://find-five-api-n9nm.vercel.app";

const qtdJogos = document.querySelector('#qtd-jogos');
const taxaVitorias = document.querySelector('#taxa-vitorias');
const seqAtual = document.querySelector('#atual-seq');
const seqMelhor = document.querySelector('#melhor-seq');

window.onload = function () {

    var tentativas = [];

    const getTentativas = async () => {
        try {
            const token = getCookie('usuario_find_five');
            const response = await axios.get(`${urlStats}/tentativas`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            let data = response.data.data;
            tentativas = data;

            renderizaGrafico();
        } catch (error) {
            console.log(error);
        }
    }

    getTentativas();

    function renderizaGrafico(){
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "dark2",
            animationEnabled: true,
            backgroundColor: "transparent",

            axisY: {
                labelFontSize: 0,
                gridThickness: 0,
                lineThickness: 0
            },

            axisX: {
                title: "Nº de tentativas",
                titleFontSize: 20,
                labelFontSize: 20,
                gridThickness: 0,
                lineThickness: 1
            },

            legend: {
                cursor: "pointer",
                itemclick: function (e) {
                    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    }
                    else {
                        e.dataSeries.visible = true;
                    }
                    chart.render();
                }
            },

            data: [
                {
                    type: "bar",
                    dataPoints: [
                        { label: "💀", y: tentativas[6].qtd, color: "#F95F2D", indexLabel: tentativas[6].taxa + "%" },
                        { label: tentativas[5].num, y: tentativas[5].qtd, color: "#F95F2D", indexLabel: tentativas[5].taxa + "%", indexLabelAlign: "right" },
                        { label: tentativas[4].num, y: tentativas[4].qtd, color: "#F95F2D", indexLabel: tentativas[4].taxa + "%", indexLabelAlign: "right" },
                        { label: tentativas[3].num, y: tentativas[3].qtd, color: "#F95F2D", indexLabel: tentativas[3].taxa + "%", indexLabelAlign: "right" },
                        { label: tentativas[2].num, y: tentativas[2].qtd, color: "#F95F2D", indexLabel: tentativas[2].taxa + "%", indexLabelAlign: "right" },
                        { label: tentativas[1].num, y: tentativas[1].qtd, color: "#F95F2D", indexLabel: tentativas[1].taxa + "%", indexLabelAlign: "right" },
                        { label: tentativas[0].num, y: tentativas[0].qtd, color: "#F95F2D", indexLabel: tentativas[0].taxa + "%", indexLabelAlign: "right" }

                    ],
                    indexLabelPlacement: "outside",
                    indexLabelFontSize: "17"
                }
            ],
        });

        chart.render();

        let credit = document.querySelector('.canvasjs-chart-credit')
        credit.style.color = '#4393ac'
    }

}


const getEstatisticas = async () => {
    try {
        const token = getCookie('usuario_find_five');
        const response = await axios.get(`${urlStats}/estatisticas`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const estatisticas = response.data.data;
        qtdJogos.innerHTML = estatisticas.jogos;
        taxaVitorias.innerHTML = `${estatisticas.vitorias}%`;
        seqAtual.innerHTML = estatisticas.seq_vitorias;
        seqMelhor.innerHTML = estatisticas.melhor_seq;
    } catch (error) {
        console.log(error);
    }
}

getEstatisticas();
