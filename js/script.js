// JavaScript Document

//trae fecha actual
function tiempoactual(){
var f = new Date();
return f.getDate() + "/" + ((f.getMonth()+1)) + "/" + f.getFullYear() +" Hora: "+ f.getHours()+ ":"+f.getMinutes();
};



var tiempocredito=0;
var periodosanuales=0;
var periodostotales=0;
var columnas=7;
var valorcredito=0;
var fechascredito = [];
var saldoacapital = [];
//INTERESES
var inominal=0;
var iperiodico=0;
var iefectivo=0;
var intereses=0;document.getElementById("interes").value;	
var tipo=0;document.getElementById("tasa").value;
var periodosano=0;document.getElementById("amortizacion").value;

//variables para calcuos en tabla-----------------------
var P=0;
var matriz = new Array();


//fin variables para calcuos en tabla-----------------------


	
function dinamica(){
	//crea matriz para alamcenar datos desde la fila 1
	for(jj=0;jj<=periodostotales;jj++){
	matriz[jj]=new Array();
	}
	//INICIALIZAMOS MATRIZ
	matriz[0][0]=P;
	matriz[0][1]=0;
	matriz[0][2]=0;
	matriz[0][3]=segurodevida(P, periodosanuales);
    matriz[0][4]=P-matriz[0][3];
		
	//columna amortizacion capital
	for(jj=1;jj<=periodostotales;jj++){
		matriz[jj][1]=aptcap(matriz[0][0], periodostotales);
		}
		
	//columna saldo capital
	for(jj=1;jj<=periodostotales;jj++){
		matriz[jj][0]=saldocap(matriz[jj-1][0], matriz[jj][1]);
		}
		
	//columna intereses
	for(jj=1;jj<=periodostotales;jj++){
		matriz[jj][2]=pagointeresa(matriz[jj-1][0], iperiodico);
		}
		
	//segdevida
	for(jj=1;jj<=periodostotales;jj++){
		matriz[jj][3]=segurodevida(matriz[jj][0], periodosanuales);
		}
		
	//flujodecaja
	for(jj=1;jj<=periodostotales;jj++){
		matriz[jj][4]=flujodecajaa(matriz[jj][1], matriz[jj][2], matriz[jj][3]);
		}
	}





function dinamicatablab(){
	//crea matriz para alamcenar datos desde la fila 1
	for(jj=0;jj<=periodostotales;jj++){
	matriz[jj]=new Array();
	}
	//INICIALIZAMOS MATRIZ
	matriz[0][0]=P; //SALDO A CAPITAL
	matriz[0][1]=0; //AMORTIZACION CAPITAL
	matriz[0][2]=0; //PAGO INTERES
	matriz[0][3]=segurodevida(P, periodosanuales); // SEGURO DE VIDA
	matriz[0][4]=P-matriz[0][3]; //FLUJO DE CAJA
	matriz[0][5]=0;	//CUOTA FIJA
	
	
	
	//cuotafija
	for(jj=1;jj<=periodostotales;jj++){
		matriz[jj][5]=cuotafijab(matriz[0][0], iperiodico, periodostotales);
		}	
		
		
	//columna intereses y  saldo capital
	for(jj=1;jj<=periodostotales;jj++){
		matriz[jj][2]=pagointeresa(matriz[jj-1][0], iperiodico); // pago intereses
		matriz[jj][1]=aptcapb(matriz[jj][5], matriz[jj][2]);//amortizacion capital
		matriz[jj][0]=saldocapb(matriz[jj-1][0], matriz[jj][1]); //saldocapital
		}
	
	
	
	//segdevida
	for(jj=1;jj<=periodostotales;jj++){
		matriz[jj][3]=segurodevida(matriz[jj][0], periodosanuales);
		}
		
	//flujodecaja
	for(jj=1;jj<=periodostotales;jj++){
		matriz[jj][4]=flujodecajaa(matriz[jj][1], matriz[jj][2], matriz[jj][3]);
		}
	}	

//CALCULA LAS FECHAS DE CUOTAS
function tiempocuotas(){
var k = new Date();
	var dia=k.getDate();
	var ano=k.getFullYear();
	var mes=k.getMonth()+1;	
	var contador=0;
	var anos=1;
	fechascredito[0]=mes+", "+dia+", "+ano;
	var pp=12/periodosanuales;
while(anos<=tiempocredito){
	for(meses=0;meses<periodosanuales;meses++){
		if(mes<=12){
			mes=mes+pp;
			if(mes>12){mes=mes-12; ano++;  }
			}else{ mes=mes-12; }
		contador++;
		fechascredito[contador]=mes+", "+dia+", "+ano;			
		}
		anos++;
}};
var nomena="";
var nomenb="";
var nomenc="";

	//convierte intereses
function convercioninteres(){
	


	if(periodosano==12){nomenb="MV"; nomenc="EM";}
	 else if(periodosano==6){nomenb="BV"; nomenc="EB";}
		else if(periodosano==4){nomenb="TV"; nomenc="ET";}
			else if(periodosano==2){nomenb="SV"; nomenc="ES";}
				else if(periodosano==1){nomenb="AV"; nomenc="EA";}
if(tipo==1){
	inominal=intereses;
	iperiodico=(intereses/periodosano)/100;
	iefectivo=intereses/periodosano;		
	}
else if(tipo==2){
	iperiodico=intereses;
	inominal=(intereses*periodosano)*100;
	iefectivo=intereses*100;			
	}
else if(tipo==3){
	iefectivo=intereses;
	inominal=intereses*periodosano;
	iperiodico=intereses/100;	
	}
	//VALORES INTERESES
	document.getElementById("nominal").innerHTML=parseFloat(inominal).toFixed(3);
	document.getElementById("periodico").innerHTML=parseFloat(iperiodico).toFixed(3);
	document.getElementById("efectivo").innerHTML=parseFloat(iefectivo).toFixed(3);
	//NOMENCLATURAS INTERESES
	document.getElementById("ama").innerHTML="% "+nomenb;
	document.getElementById("amb").innerHTML="% "+nomenb;
	document.getElementById("amc").innerHTML="% "+nomenc;
// alert("inominal "+inominal+" iperiodico "+iperiodico+" iefectivo "+iefectivo);
 
 	};
//function amortizacion a capital
function aptcap(capi, tiemp){
	//capi es saldo a capital, tiem es periodostotales
	var apca=capi/tiemp;
	
	return apca;
	}

//TRAE EL  SALDO A CAPITAL
function saldocap(saldoant, amo){
//saldo anterior y la amortizacion actual
var saldd=saldoant-amo;
return saldd;
	};
	
//TRAE EL VALOR DE SEGURO DE VIDA
function segurodevida(cap, per){
    var sv=((cap*5)/1000)*(12/per);
	return sv;
	};
	
//pago de intereses para la linea 1
function pagointeresa(cap, inter){
		//CAP ES SALDO A CAPITAL FECHA ANTERIOR Y INTER ES INTERES PERIODICO
		var interesespag=cap*inter;
		return interesespag;
    };
//tre el flujo de caja linea  1
function flujodecajaa(amoracap, pinter, segvida){
	var valor=(amoracap+pinter+segvida)*(-1);
	return valor;
	
	};
//calcula la cuota fija de la linea 2
function cuotafijab(cap, intper, nperiodo){
	var x=1+intper;
	var arri=Math.pow(x, nperiodo)*intper;
	var abaj=Math.pow(x, nperiodo)-1;
	var anu=arri/abaj;
	var anu=anu*cap;
	return anu;
	
	};
//TRAE EL  SALDO A CAPITAL linea 2
function saldocapb(saldoant, amor){
//saldo anterior y la amortizacion actual
var saldd=saldoant-amor;
return saldd;
	};
//Trae amortizacion capital linea 2	
function aptcapb(cotfij, paginteres){
	var apt=cotfij-paginteres;
	return apt;
	
	}


//EJECUTA FUNCIONES DE CALCULOS
function procesos(){

	}



 //BORRA LA TABLA CREADA
function crear2(){
document.getElementById("resultado").innerHTML="";
}

 //CREA TABLA CON INFORMACION DE LA LINEA 1
function crear(){
	
	crear2();//BORRA TABLA CREADA
	procesos();//GENERA PROCESOS PRINCIPALES

var col = columnas;
var filas = periodostotales;
var jj=4;
var tabla="<table border='1' class='resultado'>";
//GENERA EL ENCABEZADO DE LA TABLA
tabla+="<tr><td>"+"PERIODO"+"</td><td>"+"FECHA DE PAGO"+"</td><td>"+"SALDO CAPITAL"+"</td><td>"+"AMORTIZACION"+"</td><td>"+"PAGO INTERESES"+"</td><td>"+"SEG. DE VIDA"+"</td><td>"+"FLUJO DE CAJA"/*+"</td><td>"+"TITULO 7"+"</td></tr>"*/
for(i=0;i<=filas;i++){
tabla+="<tr>";
for(j=0;j<col;j++){
	//GENERA LA COLUMNA 0 DE LA TABLA
	
	if(j==0){
	tabla+="<td> "+i+" </td>";	
	}
	//GENERA LA COLUMNA 1 DE LA TABLA
	if(j==1){
	var fecha = new Date(fechascredito[i]);
	tabla+="<td> "+fecha.toDateString()+" </td>";	
	}
	//GENERA LA COLUMNA 2 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][0], 2, [',', "'", '.'])+" </td>";	
		}
	//GENERA LA COLUMNA 3 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][1], 2, [',', "'", '.'])+" </td>";	
	}
	//GENERA LA COLUMNA 4 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][2], 2, [',', "'", '.'])+" </td>";	
	}
	//GENERA LA COLUMNA 5 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][3], 2, [',', "'", '.'])+" </td>";	
	}
	//GENERA LA COLUMNA 6 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][4], 2, [',', "'", '.'])+" </td>";	
	}
	//GENERA LA COLUMNA 7 DE LA TABLA
	/*if(j==1){
	var fecha = new Date(fechascredito[i]);
	tabla+="<td> "+7+" </td>";	
	}*/
	
}
tabla+="</tr>";
}
tabla+="</table>";
document.getElementById("resultado").innerHTML=tabla;
}

//CREA TABLA CON INFORMACION DE LA LINEA 2
function creartabla2(){
	
	crear2();//BORRA TABLA CREADA
	procesos();//GENERA PROCESOS PRINCIPALES

var col = columnas;
var filas = periodostotales;
var jj=4;
var tabla="<table border='1' class='resultado'>";
//GENERA EL ENCABEZADO DE LA TABLA
tabla+="<tr><td>"+"PERIODO"+"</td><td>"+"FECHA DE PAGO"+"</td><td>"+"SALDO CAPITAL"+"</td><td>"+"AMORTIZACION"+"</td><td>"+"PAGO INTERESES"+"</td><td>"+"SEG. DE VIDA"+"</td><td>"+"CUOTA FIJA"+"</td><td>"+"FLUJO DE CAJA"+"</td></tr>"
for(i=0;i<=filas;i++){
tabla+="<tr>";
for(j=0;j<col;j++){
	//GENERA LA COLUMNA 0 DE LA TABLA
	
	if(j==0){
	tabla+="<td> "+i+" </td>";	
	}
	//GENERA LA COLUMNA 1 DE LA TABLA
	if(j==1){
	var fecha = new Date(fechascredito[i]);
	tabla+="<td> "+fecha.toDateString()+" </td>";	
	}
	//GENERA LA COLUMNA 2 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][0], 2, [',', "'", '.'])+" </td>";	
		}
	//GENERA LA COLUMNA 3 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][1], 2, [',', "'", '.'])+" </td>";	
	}
	//GENERA LA COLUMNA 4 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][2], 2, [',', "'", '.'])+" </td>";	
	}
	//GENERA LA COLUMNA 5 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][3], 2, [',', "'", '.'])+" </td>";	
	}
	//GENERA LA COLUMNA 6 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][5], 2, [',', "'", '.'])+" </td>";	
	}
	//GENERA LA COLUMNA 7 DE LA TABLA
	if(j==1){
	tabla+="<td> "+separarmiles(matriz[i][4], 2, [',', "'", '.'])+" </td>";	
	
	}
	
}
tabla+="</tr>";
}
tabla+="</table>";
document.getElementById("resultado").innerHTML=tabla;
}//FIN DE CREACION DE LA LINEA 2


 	
//TRAE LA FECHA ACTUAL	
$(document).ready(function(){
$("#fecha").val(tiempoactual());
$('#lineascre').hide();
$('#lineascreb').hide();
$('#lineascrec').hide();
$('.datospersonales').hide();
$('.printer').hide();
	
    });
	
//realiza impresion de resultados
function imprimir(){
  var objeto=document.getElementById('areaimpresiona');
  var ventana=window.open('','_blank');  //abrimos una ventana vacía nueva
  ventana.document.write(objeto.innerHTML);  //imprimimos el HTML del objeto en la nueva ventana
  ventana.document.close();  //cerramos el documento
  ventana.print();  //imprimimos la ventana
  ventana.close();  //cerramos la ventana
}

function separarmiles(value, decimals, separators) {
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(value) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    value = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = value.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
            + separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return (parts.length == 3 ? '-' : '') + result;
}

$('select#lineacredito').on('change',function(){
    var valor = $(this).val();
	$('.printer').hide();
	$('#resultado').hide();
	$('.datospersonales').hide();
	$('#lineascreb').hide("linear");
	$('#lineascrec').hide("linear");
	$('#lineascre').hide("linear");
	if(valor==1){
		
				$('#lineascre').show(1000, "linear");
	}else if(valor==2){
		
		$('#lineascreb').show(1000,"linear");
	}else if(valor==3){
		
		$('#lineascrec').show(1000,"linear");
	}
   
	});
	
//Calcula y trae funciones de la  linea 1-----------------------
$("#enviar").click(function(){
	P=document.getElementById("vrcredito").value;
	intereses=document.getElementById("interes").value;	
	tipo=document.getElementById("tasa").value;
	periodosano=document.getElementById("amortizacion").value;

	$('#resultado').show();
	$('#lineascreb').hide("linear");
	$('#lineascrec').hide("linear");
	$('#lineascre').hide("linear");
	$('.datospersonales').show("linear");
	$('.printer').show(1000,"linear");
	
   
	var fecha = new Date(fechascredito[0]);
	document.getElementById("resa").innerHTML=fecha.toDateString();
	var lincred=document.getElementById("lineacredito").value;
	var ll="";
	if(lincred==1){		ll="1. ORDINARIA TRADICIONAL";
		}else if(lincred==2){		ll="2. CUOTA FIJA TASA FIJA";
			}else if(lincred==3){		ll="3. CUOTA FIJA TASA VARIABLE";
				}
				
	//deja por defecto 0 la seleccion de linea de credito
    $('#lineacredito > option[value="0"]').attr('selected', 'selected');
convercioninteres();
	//llena formulario			
	document.getElementById("resb").innerHTML=ll;
	var nombress=document.getElementById("nombres").value + " " + document.getElementById("apellidos").value;
	document.getElementById("resc").innerHTML=nombress;
	document.getElementById("resdd").innerHTML=document.getElementById("ced").value;
	document.getElementById("rese").innerHTML=document.getElementById("correo").value;
	document.getElementById("resf").innerHTML=document.getElementById("tel").value;
	document.getElementById("resg").innerHTML=document.getElementById("vrcredito").value;
	document.getElementById("resh").innerHTML=document.getElementById("tcredito").value + " AÑO(S)";
	document.getElementById("resi").innerHTML=parseFloat(inominal).toFixed(3)+"% "+nomenb;
	document.getElementById("resj").innerHTML=parseFloat(iperiodico).toFixed(3)+"% "+nomenb;
	document.getElementById("resk").innerHTML=parseFloat(iefectivo).toFixed(3)+"% "+nomenc;
	
	//procesoa	
	tiempocredito=document.getElementById("tcredito").value;
	periodosanuales=document.getElementById("amortizacion").value;
	periodostotales=tiempocredito*periodosanuales;
	
	if(tiempocredito == 1 || tiempocredito == 2 || tiempocredito == 3 || tiempocredito == 4 || tiempocredito == 5){
		}else{alert("El tiempo de credito debe ser entre 1 y 5 años.");
				periodostotales=0;
		}
	tiempocuotas();
	saldocap();
	
	dinamica();
	//crea tabla	
	crear();
	});
	
$('#limpiar').click(function(){
	
	$('.datospersonales').hide();
	
	});
	
//Calcula y trae las funciones de la linea 2----------------------------------------------------
	
$("#enviarb").click(function(){
	P=document.getElementById("vrcreditob").value;
	intereses=document.getElementById("interesb").value;	
	tipo=document.getElementById("tasab").value;
	periodosano=document.getElementById("amortizacionb").value;

	
	$('#resultado').show();
	$('#lineascreb').hide("linear");
	$('#lineascrec').hide("linear");
	$('#lineascreb').hide("linear");
	$('.datospersonales').show("linear");
	$('.printer').show(1000,"linear");
	

	var fecha = new Date(fechascredito[0]);
	document.getElementById("resa").innerHTML=fecha.toDateString();
	var lincred=document.getElementById("lineacredito").value;
	var ll="";
	if(lincred==1){		ll="1. ORDINARIA TRADICIONAL";
		}else if(lincred==2){		ll="2. CUOTA FIJA TASA FIJA";
			}else if(lincred==3){		ll="3. CUOTA FIJA TASA VARIABLE";
				}
				
	   //deja por defecto 0 la seleccion de linea de credito
    $('#lineacredito > option[value="0"]').attr('selected', 'selected');
		convercioninteres();		
	//llena formulario			
	document.getElementById("resb").innerHTML=ll;
	var nombress=document.getElementById("nombresb").value + " " + document.getElementById("apellidosb").value;
	document.getElementById("resc").innerHTML=nombress;
	document.getElementById("resdd").innerHTML=document.getElementById("cedb").value;
	document.getElementById("rese").innerHTML=document.getElementById("correob").value;
	document.getElementById("resf").innerHTML=document.getElementById("telb").value;
	document.getElementById("resg").innerHTML=document.getElementById("vrcreditob").value;
	document.getElementById("resh").innerHTML=document.getElementById("tcreditob").value + " AÑO(S)";
	document.getElementById("resi").innerHTML=parseFloat(inominal).toFixed(3)+"% "+nomenb;
	document.getElementById("resj").innerHTML=parseFloat(iperiodico).toFixed(3)+"% "+nomenb;
	document.getElementById("resk").innerHTML=parseFloat(iefectivo).toFixed(3)+"% "+nomenc;
	
	//procesoa	
	tiempocredito=document.getElementById("tcreditob").value;
	periodosanuales=document.getElementById("amortizacionb").value;
	periodostotales=tiempocredito*periodosanuales;
	tiempocuotas();
	saldocap();

	dinamicatablab();
	//crea tabla	
	creartabla2();
	});
	
$('#limpiar').click(function(){
	
	$('.datospersonales').hide();
	
	});
	
	
	
	