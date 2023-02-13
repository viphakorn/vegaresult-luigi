$(document).ready(function() {

    $('#players-table').DataTable({
        "bPaginate":false,
        "bInfo":false,
        "columnDefs": [
            { "type": 'alt-string', "targets": 2 }
        ]
    });
    $('.btn-data').click( function (e) {
        e.preventDefault();
        var href = jQuery(this).attr('href');
        var idval = this.id;
        var start = idval.indexOf("trn")+3;
        var end = idval.indexOf("num");
        var idTrn = idval.substring(start,end);
        var num = idval.substring(end+3);
        updatePlayerDialog(idTrn,num);
        jQuery(href).modal('toggle');
    });

    jQuery.extend( jQuery.fn.dataTableExt.oSort, {
        /*"alt-string-pre": function ( a ) {
            return a.match(/alt="(.*?)"/)[1].toLowerCase();
        },*/

        "alt-string-asc": function( a, b ) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "alt-string-desc": function(a,b) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    } );
});



function updatePlayerDialog(idTrn,num){
    var idval="trn"+idTrn+"num"+num;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "controllers/playerData.php",
        data: {idTournament: idTrn,idPlayer:num},
        success: function (jsonResponse) {
            var idBody = "dialog-body-container-"+idval;
            var idTable = "table-"+idval;
            $('#playercard-dialog .modal-title').html("Player Results");
            $('#playercard-dialog .modal-body').html("<div id='"+idBody+"'></div>");
            var tableRounds = $("<table id='"+idTable+"' class=\"table table-striped\" style=\"margin-top: 30px;\"></table>");
            $("#"+idBody).append("<div class='player-header' align='center'><h3 style='margin-top: 0px'>"+jsonResponse.data.tname+"</h3><h2>"+jsonResponse.data.pname+" ("+jsonResponse.data.n+")</h2></div>");
            $("#"+idBody).append("<div class='player-header' align='center'><h3 style='margin-top: 0px'>Rating: "+jsonResponse.data.rtg+" Score: "+jsonResponse.data.score+"</h3></div>");
            
            $("#"+idBody).append(tableRounds);
/*
            $("#"+idTable).append("<thead><tr> <th>Round</th> <th>Color</th><th>N</th><th>Rtg</th><th>Opponent</th><th>Result</th></tr> </thead>");
            $("#"+idTable).append("<tbody></tbody>");

/*            $("#"+idTable).append("<thead><tr> <th>Round</th> <th>Opp. Rtg</th><th>Pairing</th><th>Result</th></tr> </thead>");
            $("#"+idTable).append("<tbody></tbody>");  */       
            
            $("#"+idTable).append("<thead><tr> <th>Round</th><th>Color</th><th>Fed</th><th>Opp. Rtg</th><th>Opponent</th><th>Result</th></tr> </thead>");
            $("#"+idTable).append("<tbody></tbody>");     
            
            var matchPlayers = "";
            var opponentStr = "";
            var currentPlayer = jsonResponse.data.pname;
            var whitePlayer = "";
            var blackPlayer = "";
            var colorIcon = "";
            $.each(jsonResponse.reslist, function(k, v) {
                if(v.OPPONENT!=null) {
                    opponentStr = " <a href='#' onclick='updatePlayerDialog(" + idTrn + "," + v.ID + ")'> " +v.T +" "+ v.OPPONENT + " </a>";
                	if(v.C=='W'){
                		matchPlayers = "<span>"+currentPlayer+"</span> - "+opponentStr;
                		whitePlayer = currentPlayer;
                		blackPlayer = opponentStr;
                		colorIcon = "<span class=\"glyphicon glyphicon-pawn white_chess\" aria-hidden=\"true\"></span>";
                	}else if(v.C=='B'){
                		matchPlayers = opponentStr + " - <span>"+currentPlayer+"</span>";
                		whitePlayer = opponentStr;
                		blackPlayer = currentPlayer;
                		colorIcon = "<span class=\"glyphicon glyphicon-pawn black_chess\" aria-hidden=\"true\"></span>";
                	}
                }else{
                    opponentStr = "<span style='color:#989898; font-weight: bold'; >Not played</span>";
                }
/*
                $("#"+idTable).append("<tr><td>"+v.R+"</td><td>"+v.C+"</td><td>"+v.ID+"</td><td>"+v.RTG+"</td><td>"+matchPlayers+"</td><td>"+v.result+"</td></tr>");

                $("#"+idTable).append("<tr><td>"+v.R+"</td><td>"+v.RTG+"</td><td>"+matchPlayers+"</td><td>"+v.result+"</td></tr>");
  */
 				$("#"+idTable).append("<tr><td>"+v.R+"</td><td>"+colorIcon+"</td><td>"+v.FED+"</td><td>"+v.RTG+"</td><td>"+opponentStr+"</td><td>"+v.resultP+"</td></tr>");
            });
        }
    });
}
