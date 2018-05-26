// cria objeto
		var jason = {
			id: "",
			stars: "",
			forks: "",
			contribs: "",
			commitDates: [],
			commitDatesValues: []
		};
		
		// requisição
		$.get("https://api.github.com/orgs/globocom/repos", function(response){

			// loop dos repositórios
			for (i = 0; i < response.length; i++) { 
				$("#repo-name").append("<option value='" + i + "'>" + response[i].name + "</option>");
			} // fim do loop

			// preenche com infos do primeiro repositorio
			jason.id = $("#repo-name").val();
			jason.stars = response[jason.id].stargazers_count;
			jason.forks = response[jason.id].forks_count;
			
			// modifica os valores em si
			function atualizaValores(idSelect) {
				
				jason.stars = response[idSelect].stargazers_count;
				jason.forks = response[idSelect].forks_count;
				
				// digita fork do repositório
				$(".fork-count").text(jason.forks);

				// digita estrelas do repositório
				$(".star-count").text(jason.stars);

				// busca Contribs
				$.get("https://api.github.com/repos/globocom/" + response[idSelect].name + "/contributors", function(response_contrib){

					//console.log(response_contrib);

					$(".contrib-count").text(response_contrib.length);

				});
				
			};
			
			// busca e atualiza o gráfico
			function buscaCommits(idSelect) {
				
				$.get("https://api.github.com/repos/globocom/" + response[idSelect].name + "/commits?rel=last&per_page=100", function(response_commit){

				for (i = 0; i < response_commit.length; i++) { 

					//$(".contrib-count").append("<li>" + moment(response_commit[i].commit.author.date).format("MMM YY") + "</li>");

					// coloca datas no objeto, já formatadas com Moment.js
					jason.commitDates.push( moment(response_commit[i].commit.author.date).format("MMM YY") );
				} // fim do loop
				
				// ordenar datas em ordem crescente
				jason.commitDates = jason.commitDates.reverse();
				
				// conta e exporta os valores repetidos
				var counts = {};
					jason.commitDates.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
				
				jason.commitDates = Object.keys(counts);
				jason.commitDatesValues = Object.values(counts);
				
				var ctx = document.getElementsByClassName("line-chart");
		
				var chartGraph = new Chart(ctx, {
					type: 'line',
					data: {
						labels: jason.commitDates,
						datasets: [{
							label: "Commits",
							data: jason.commitDatesValues,
							borderWidth: 2,
							borderColor: 'rgba(51, 51, 51, 0.85)',
							backgroundColor: 'rgba(51, 51, 51, .2)'
						}]
					},
					options: {
						/*title: {
							display: true,
							fontFamily: "'Open Sans', sans-serif",
							fontWeight: "700",
							fontSize: 20, 
							text: "Histórico de Commits do Repositório"
						},*/
						labels: {
							fontStyle: "bold"
						},
						maintainAspectRatio: false
					}
				});

			});
			
			};
			
			atualizaValores(jason.id);
			buscaCommits(jason.id);
			
			
			// atualiza os valores a cada mudança no select
			$("#repo-name").change(function(){

				jason.id = $("#repo-name").val();
				
				atualizaValores(jason.id);
				buscaCommits(jason.id);

			});

        });
		