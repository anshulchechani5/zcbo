sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("zbco.controller.View1", {
      onInit: function () {
        var oModel = new sap.ui.model.json.JSONModel();
        sap.ui.getCore().setModel(oModel);
        this.getView().setModel(oModel, "view");
        this.getView().setModel(new JSONModel(), "oTableItemModel");
        this.getView().getModel('oTableItemModel').setProperty("/aTableItem", []);

        
      },
      csvJSON: function (csv) {
        var oBusyDialog = new sap.m.BusyDialog({
          text: "Please wait"
        });
        oBusyDialog.open();

        var oTableModel = this.getView().getModel('oTableItemModel');
        // var oContext = csv.getSource().getBindingContext('oTableItemModel').getObject();
        var lines = csv.split('\n');
        var result = [];
        var headers = lines[0].split(',');
        for (var i = 1; i < lines.length; i++) {
          var obj = {};
          var currentline = lines[i].split(',');
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
          result.push(obj);
        }
        var oStringResult = JSON.stringify(result);
        var oFinalResult = JSON.parse(oStringResult.replace(/\\r/g, ''));
        var len = oFinalResult.length - 1;
        var data = [];
        for (var j = 0; j < len; j++) {
          var ata = {};
          ata = oFinalResult[j];
          data.push(ata);
        }


        //return result; //JavaScript object
        oTableModel.setProperty("/aTableItem", data);
        this.getView().byId('table1').setVisibleRowCount(data);
        oBusyDialog.close();

      },
      onConfirmDialog: function () {
        var that = this;
        var dialog = new sap.m.Dialog({
          title: 'Upload',
          type: 'Message',
          icon: 'sap-icon://upload',
          content: [
            new sap.ui.unified.FileUploader({
              width: '100%',
              uploadUrl: 'upload/',
              change: function (oEvent) {
                var file = oEvent.getParameter('files')[0];
                if (file && window.FileReader) {
                  var reader = new FileReader();
                  reader.onload = function (evn) {
                    var strCSV = evn.target.result; //string in CSV
                    that.csvJSON(strCSV);
                  };
                  reader.readAsText(file);
                }
                dialog.close();
              },
            }),
          ],

          endButton: new sap.m.Button({
            text: 'Cancel',
            press: function () {
              dialog.close();
            },
          }),
        });
        dialog.open();
      },
      getData:function(){
        var tabledata = this.getView().getModel("oTableItemModel").getData();
        var oTableModel = this.getView().getModel("oTableItemModel")
        var aTableArr = oTableModel.getProperty("/aTableItem");

        for(var i=0;i<aTableArr.length;i++){
        var k = i + 1;
          if(aTableArr[i].Party==="" || aTableArr[i].Date==="" || aTableArr[i].SrNo==="" || aTableArr[i].DyeingSort==="" || aTableArr[i].LoomNo==="" ||
          aTableArr[i].SizedBeamNo==="" || aTableArr[i].SizedSetNo==="" || aTableArr[i].GreigeSort==="" || aTableArr[i].BeamNo==="" || aTableArr[i].TotalEnds==="" ||
          aTableArr[i].PickOnFabric==="" || aTableArr[i].Reed==="" ||aTableArr[i].ReedSpace==="" ||aTableArr[i].Weft1Count==="" ||
          aTableArr[i].Weft2Count==="" || aTableArr[i].MillWeft1==="" || aTableArr[i].LotNoWeft1==="" || aTableArr[i].MillWeft2==="" || aTableArr[i].LotNoWeft2==="" ||
          aTableArr[i].BeamGettingDate==="" || aTableArr[i].BeamLength===""  || aTableArr[i].BalenceMeter==="" ||
          aTableArr[i].PlanBeamPipe==="" || aTableArr[i].BeemDia==="" || aTableArr[i].AFST==="" ||aTableArr[i].AWST==="" ||aTableArr[i].AEFFPer==="" ||aTableArr[i].BFST==="" ||
          aTableArr[i].BWST==="" || aTableArr[i].BEFFPer==="" ||aTableArr[i].ActShiftA==="" ||aTableArr[i].ActShiftB==="" ||aTableArr[i].RPM==="" 
          || aTableArr[i].CalShiftA==="" ||aTableArr[i].CalShiftB===""){
            MessageBox.error("Please Fill all the Required Fileds in line No" + (i+1));
           break;
          }
          else if(k === aTableArr.length ){
               this.getData1();
          }
        }
      },
      getData1: function () {
        var oBusyDialog = new sap.m.BusyDialog({
          text: "Please wait"
        });
        oBusyDialog.open();

        var tabledata = this.getView().getModel("oTableItemModel").getData();
        var oTableModel = this.getView().getModel("oTableItemModel")
        var aTableArr = oTableModel.getProperty("/aTableItem")
        var aNewArr = [];

        aTableArr.map(function (items) {
          var obj = {
            "party": items.Party,
            "zdate": items.Date,
            "srno": items.SrNo,
            "DyeingShort": items.DyeingSort,
            "loomno": items.LoomNo,
            "sizbeemno": items.SizedBeamNo,
            "sizsetno": items.SizedSetNo,
            "beamissu": items.BeamNo,
            "shortno": items.GreigeSort,
            "ends": items.TotalEnds,
            "pickonfabric": items.PickOnFabric,
            "reed": items.Reed,
            "reedspace": items.ReedSpace,
            "weft1count": items.Weft1Count,
            "weft2count": items.Weft2Count,
            "millweft1": items.MillWeft1,
            "LotNoWeft1": items.LotNoWeft1,
            "millweft2": items.MillWeft2,
            "LotNoWeft2": items.LotNoWeft2,
            "beamgettingdate":items.BeamGettingDate,
            "beamfalldate": items.BeamFallDate,
            "beamlength": items.BeamLength,
            "BalenceMeter": items.BalenceMeter,
            "planbeampipe": items.PlanBeamPipe,
            "beemdia": items.BeemDia,
            "afst": items.AFST,
            "awst": items.AWST,
            "aeffper": items.AEFFPer,
            "bfst": items.BFST,
            "bwst": items.BWST,
            "beffper": items.BEFFPer,
            "acshifta": items.ActShiftA,
            "acshiftb": items.ActShiftB,
            "rpm": items.RPM,
            "calshifta": items.CalShiftA,
            "calshiftb": items.CalShiftB,
            "Knotting":items.Knotting,
            "ReKnotting":items.ReKnotting,
            "Getting":items.Getting 
          }
          aNewArr.push(obj)
        })
        // https://my405100.s4hana.cloud.sap/sap/bc/http/sap/zpp_bco_http_service?sap-client=080
        var data = tabledata;
        $.ajax({
          type: "POST",
          url: "/sap/bc/http/sap/zpp_bco_http_service?sap-client=080",
          data: JSON.stringify(aNewArr),
          contentType: "application/json; charset=utf-8",
          traditional: true,
          success: function (data) {
            oBusyDialog.close();
            var meta = data.slice(0, 5);
            var message = data.slice(5, 200);
            if (meta === "ERROR") {
              MessageBox.error(message, {
                title: "Warning",
                icon: MessageBox.Icon.ERROR
              });
            }
            else {
              MessageBox.success(data, {
                title: "Data Saved Succesfully",
                icon: MessageBox.Icon.success,
                onClose: function (oAction) {
                  if (oAction === MessageBox.Action.OK) {
                    window.location.reload();
                  }
                }
              });
            }

          },
          error: function (error) {
            oBusyDialog.close();
            console.log(error);
            MessageBox.show(error, {
              onClose: function (oAction) {
                if (oAction === MessageBox.Action.OK) {
                  window.location.reload();
                }
              }
            });

          }
        });

      },
    });
  });
