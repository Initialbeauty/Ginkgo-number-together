$(function(){
	//页面加载触发点击事件
//	window.onload=function(){
//		$(".pic-title>div").eq(0).click();
//	}
	
	//动态生成借贷申请记录的机构数和单位进度条
	$(".lending-institution-div").each(function(i,value){
		//获取分母，总机构数
		var sumNumber=$(".lending-institution-div").eq(i).find(".right").text().lastIndexOf("家");
		var sum=$(".lending-institution-div").eq(i).find(".right").text().slice(sumNumber-1,sumNumber)
		
		//获取分子，当前机构数
		var num=$(".lending-institution-div").eq(i).find(".right span").text().slice(0,1)
		$(".lending-institution-div").eq(i).find(".verify-progressbar p").width(num/sum*100+"%");
	})
	
	//点击切换借贷申请查询月份
	$(".pic-title>div").click(function(){
		$(this).addClass("pic-title-active").siblings().removeClass("pic-title-active")
	})
	
	//借贷申请饼图
	var loanApplication= echarts.init(document.getElementById('loan-application'));
	var option1= {
		title:{
			text: '13次',
	        x: '19%',
	        y: 'center',
	        textStyle: {
	            fontSize:18,
	            fontWeight:'400',
	            color: ['#333']
	        },
		},
	    tooltip : {
	        trigger: 'item',
	        formatter: "{b}申请次数: {c}次"
	    },
	    legend: {
	        orient : 'vertical',
	        x : '50%',
	        y : "center",
	        itemHeight:8,
	  		itemWidth: 8,
	  		icon:"rect",
	        data:['小贷机构','持牌网络小贷机构','持牌汽车金融机构','消费类分期机构','非银其他持牌机构','传统银行','网络零售银行'],
	        formatter:function(name){ //formatter（文本格式器）中，模板变量为name
	        	var index = 0;
	            var clientlabels = ['小贷机构','持牌网络小贷机构','持牌汽车金融机构','消费类分期机构','非银其他持牌机构','传统银行','网络零售银行'];
	            var clientcounts = ["3次","3次","2次","2次","1次","1次","1次"];
	            clientlabels.forEach(function(value,i){
	                if(value == name){
	                    index = i;
	                }
	            });
	            return name + "    " + clientcounts[index];
	        }
	    },
	    calculable : false,
	    series : [
	        {
	            name:'贷款申请记录',
	            type:'pie',
	            radius : ['45%','60%'],
	            center:["25%","50%"],
	            label: {
	                normal : {
	                    show : false
	                },
	            },
	            labelLine : {
	            	normal : {
	               		show : false
	               }
	            },
	             itemStyle:{
	                borderWidth:5,
	                borderColor:'#fff',
	            },
	            data:[
	                {value:3, name:'小贷机构',itemStyle:{color:"#5b9bd5"}},
	                {value:3, name:'持牌网络小贷机构',itemStyle:{color:"#ed7d31"}},
	                {value:2, name:'持牌汽车金融机构',itemStyle:{color:"#a5a5a5"}},
	                {value:2, name:'消费类分期机构',itemStyle:{color:"#ffc000"}},
	                {value:1, name:'非银其它持牌机构',itemStyle:{color:"#4472c4"}},
	                {value:1, name:'传统银行',itemStyle:{color:"#70ad47"}},
	                {value:1, name:'网络零售银行',itemStyle:{color:"#265e91"}},
	            ]
	        }
	    ]
	};
	loanApplication.setOption(option1);
	
	//借贷申请-业务类型饼图
	var businessType= echarts.init(document.getElementById('business-type'));
	var option2= {
		title:{
			text: '13次',
	        x: '19%',
	        y: 'center',
	        textStyle: {
	            fontSize:18,
	            fontWeight:'400',
	            color: ['#333']
	        },
		},
	    tooltip : {
	        trigger: 'item',
	        formatter: "{b}申请次数: {c}次"
	    },
	    legend: {
	        orient : 'vertical',
	        x : '50%',
	        y : "center",
	        itemHeight:8,
	  		itemWidth: 8,
	  		icon:"rect",
	        data:['线上现金分期','汽车金融','线下现金分期','线下消费分期','信用卡 类信用卡','其他业务'],
	        formatter:function(name){ //formatter（文本格式器）中，模板变量为name
	        	var index = 0;
	            var clientlabels = ['线上现金分期','汽车金融','线下现金分期','线下消费分期','信用卡 类信用卡','其他业务'];
	            var clientcounts = ["3次","2次","2次","1次","1次","1次"];
	            clientlabels.forEach(function(value,i){
	                if(value == name){
	                    index = i;
	                }
	            });
	            return name + "    " + clientcounts[index];
	        }
	    },
	    calculable : false,
	    series : [
	        {
	            name:'贷款申请记录',
	            type:'pie',
	            radius : ['45%','60%'],
	            center:["25%","50%"],
	            label: {
	                normal : {
	                    show : false
	                },
	            },
	            labelLine : {
	            	normal : {
	               		show : false
	               }
	            },
	            itemStyle:{
	                borderWidth:5,
	                borderColor:'#fff',
	            },
	            data:[
	                {value:3, name:'线上现金分期',itemStyle:{color:"#5b9bd5"}},
	                {value:2, name:'汽车金融',itemStyle:{color:"#a5a5a5"}},
	                {value:2, name:'线下现金分期',itemStyle:{color:"#ffc000"}},
	                {value:1, name:'线下消费分期',itemStyle:{color:"#4472c4"}},
	                {value:1, name:'信用卡 类信用卡',itemStyle:{color:"#70ad47"}},
	                {value:1, name:'其他业务',itemStyle:{color:"#265e91"}},
	            ]
	        }
	    ]
		
	};
	businessType.setOption(option2);
	
	//行为风险测评
	var behaviorRisk= echarts.init(document.getElementById('behavior-risk'));
	var e=70;
	var color=null;
	if(e>=80){
		color="#f50039";
		$(".risk-level").text("高");
		$(".risk-level").addClass("risk-level-h")
	}
//	else if(e<80 && e>=60){
//		color="#a719ba";
//		$(".risk-level").text("高")
//	}
	else{
		color="#20a76e";
		$(".risk-level").text("低");
		$(".risk-level").addClass("risk-level-l")
	}
	var option3= {
	    tooltip: {
	        trigger: 'item',
	        formatter: "行为风险：{b}",
	        show:false
	    },
	    legend: {
	        orient: 'vertical',
	        x: 'left',
	        show:false
	    },
	    series: 
	        {
	            name:'',
	            type:'pie',
	            radius : ['50%','65%'],
            	center:["30%","50%"],
	            avoidLabelOverlap: true,
	            hoverAnimation:false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                },
	                emphasis: {
	                    show: false
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            itemStyle:{
	                borderWidth:2,
	                borderColor:'#fff',
	            },
	            data:[
	                {value:e, name:'',itemStyle:{color:color}},
	                {value:100-e, name:'',itemStyle:{color:"#bab8b8"}}
	            ]
	        }
		    
	};
	behaviorRisk.setOption(option3);
	
	//资产预测更改颜色
	for (var i=0;i<$(".forecast-p").length;i++) {
		if($(".forecast-p").eq(i).text()=="是"){
			$(".forecast-p").eq(i).addClass("forecast-yes")
		}
		else{
			$(".forecast-p").eq(i).addClass("forecast-no")
		}
	}
	//点击身份证关联和手机关联改变
	$(".change-relevance").eq(0).show()
	$(".relevance-div").click(function(){
		var index=$(this).index();
		$(".change-relevance").hide();
		$(".change-relevance").eq(index).show()
		$(this).addClass("relevance-chose").siblings().removeClass("relevance-chose")
	})
	
	//个人信息关联的匹配
	for (var i=0;i<$(".mate-b").length;i++) {
		if($(".mate-b").eq(i).text()=="匹配成功"){
			$(".mate-b").eq(i).css("color","#e81c1c")
		}
		else{
			$(".mate-b").eq(i).css("color","#000000")
		}
	}
	
	//点击选择报告价值
	$(".chose-img").click(function(){
		if($(this).hasClass("chose-yes")){
			$(this).removeClass("chose-yes")
		}
		else{
			$(this).addClass("chose-yes").parent().siblings().children().removeClass("chose-yes")
		}
	})
	
	//限制建议字数
	$(".suggest-div textarea").keyup(function(){
		var num=$(this).val().length;
		$(".suggest-div p span").text(num)
	})
	
	
	//用户画像js
	
	//信贷需求指数指针
	var xyscore=$(".xy-score").text();
	$(".credit-score-pointer").css("margin-left",xyscore+"%");
	$(".credit-score-pointer").css("visibility","visible")
	
	//高信指数仪表盘
	var gauge1 = echarts.init(document.getElementById('gauge1'));
    // 指定图表的配置项和数据
    gauge1.setOption({
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [{
            startAngle: 180, //开始角度 左侧角度
            endAngle: 0, //结束角度 右侧
            name: '业务指标',
            type: 'gauge',
            center:["50%","90%"],
            radius: "150%",
            min: 0,
			max: 100,
			splitNumber:20,
            detail: { formatter: '{value}%' },
//					axisLabel: {
//			            show: false
//			        },
			itemStyle:{//指针样式
				normal:{
					 color:"#dbdbdb",
					 borderWidth: 0,  
				}
			},
			pointer: {
                //指针长度
                length:'110%',
                width:5,
            },
            axisLabel:{
                distance:-5,
                textStyle:{
                	color:"#666666",
                },
                formatter:function(value){
            		switch (value){
            			case 0:
            				return 0;
            			case 30:
            				return 30;
            			case 45:
            				return 45;
            			case 55:
            				return 55;
            			case 75:
            				return 75;
            			case 100:
            				return 100;
            			default:
            				return "";
            		}
            	}
            },
            axisLine: { // 坐标轴线  
                lineStyle: {
              	color: [
                    [1,new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0.1,
                        color: "#f96136"
                      },
                      {
                        offset: 0.6,
                        color: "#f9dd3f"
                      },
                      {
                        offset: 1,
                        color: "#5fd17c"
                      }
                    ])
                  ],
                  [
                                    1, '#f2f4f4'
                                ]
                ],
                width:20
            }
        },
		axisTick: {
            show: false
        },
        splitLine: {
            show: false
        },
        data: [{ value:90}],
        
        detail: {
                show: true,
                offsetCenter: [0, '-25%'],
                formatter: '{value}',
                textStyle: {
                    fontSize:20,
                    fontWeight:600,
                    color:"#0cc17b"
                }
            },
        }]
    });
            
    //债偿压力指数指针，进度条
	var zcscore=$(".zc-score").text();
	var proSpan=parseFloat(zcscore)+2;
	$(".zc-score-pointer").css("margin-left",zcscore+"%");
	$(".zc-score-pointer").css("visibility","visible");
	$(".zc-progress span").css("width",proSpan+"%")
	
	
	//信用风险评分
	var gauge2 = echarts.init(document.getElementById('gauge2'));
        // 指定图表的配置项和数据
        gauge2.setOption({
		    tooltip: {},
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '0%',
		        top: '0%',
		        containLabel: true,
		        borderWidth: '0'
		    },
		    series: [{
		    	startAngle: 180, //开始角度 左侧角度
                endAngle: 0, //结束角度 右侧
                center:["50%","90%"],
                radius: "160%",
		        name: '业务指标',
		        type: 'gauge',
		        splitNumber:20, 
		        min: 0,
		        max: 1000,
		        itemStyle:{//指针样式
					normal:{
						 color:"#dbdbdb",
						 borderWidth: 0,  
					}
				},
				pointer: {
                    //指针长度
                    width:4,
                },
		        axisLine: { // 坐标轴线
		            lineStyle: { // 属性lineStyle控制线条样式
	                color: [
	                    [0.45, '#32cb47'],
	                    [0.55, '#b7582c'],
	                    [1, '#f42420'],
	                ],
		                width: 0
		            }
		        },
		        axisTick: {
		            show: false
		        },
		        axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
		            formatter:function(value){
                		switch (value){
                			case 0:
                				return 0;
                			case 300:
                				return 300;
                			case 450:
                				return 450;
                			case 650:
                				return 650;
                			case 750:
                				return 750;
                			case 900:
                				return 900;
                			default:
                				return "";
                		}
                	},
		            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                color: '#999999'
		            }
		        },
		        splitLine: { // 分隔线
		            show: true, // 默认显示，属性show控制显示与否
		            length: 20, // 属性length控制线长
		            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
		                color: 'auto',
		                width: 2,
		            }
		        },
		        title: {
		            show: true,
		            color:"#b2b2b2",
		            offsetCenter: [0, '-40%'], // x, y，单位px
		            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                fontSize: 12
		            }
		        },
		        detail: {
                    show: true,
                    offsetCenter: [0, '-15%'],
                    formatter: '{value}',
                    textStyle: {
                        fontSize:30,
                        fontWeight:600,
                        color:"#24cc57"
                    }
                },
		        data: [
		        {value:266,name:"风险得分"}]
		    }]
		});
		
	//综合评分
	var gauge3 = echarts.init(document.getElementById('gauge3'));
        // 指定图表的配置项和数据
	var demoData = [
	    {
	        value:57,
	        unit: '分',
	    }
	];
	
	gauge3.setOption({
	    series: (function() {
	        var result = [];
	        demoData.forEach(function(item) {
	            result.push(
	                // 外围刻度
	                {
	                    type: 'gauge',
	                    center:['50%', '85%'],
	                    radius: '125%', // 1行3个
	                    splitNumber: 20,
	                    min: 0,
	                    max: 100,
	                    startAngle: 180,
	                    endAngle: 0,
	                    axisLine: {
	                        show: true,
	                        lineStyle: {
	                            width:2,
	                            color: [
	                                [0.25, '#8729af'],
				                    [0.75, '#434343'],
				                    [1, '#bfbfbf'],
	                            ]
	                        }
	                    }, //仪表盘轴线
	                    axisTick: {
	                        show: false,
	                    }, //刻度样式
	                    splitLine: {
	                        show: true,
	                        length:-7,
	                        lineStyle: {
	                            color: '#aaaaaa'
	                        },
	                    }, //分隔线样式
	                    axisLabel: {
	                        show: true,
	                        distance:-15,
	                        textStyle: {
	                            color: "#909090",
	                            fontSize: '12',
	                        },
	                        formatter:function(value){
	                		switch (value){
	                			case 0:
	                				return 0;
	                			case 30:
	                				return 30;
	                			case 45:
	                				return 45;
	                			case 55:
	                				return 55;
	                			case 75:
	                				return 75;
	                			case 100:
	                				return 100;
	                			default:
	                				return "";
	                		}
	                	}
	                    },
	                    pointer: {
	                        show: 0
	                    },
	                    detail: {
	                        show: 0
	                    }
	                },
	
	                // 内侧指针、数值显示
	                {
	                    name: item.name,
	                    type: 'gauge',
	                    center: ["50%","85%"],
	                    radius: '110%',
	                    startAngle: 180,
	                    endAngle:0,
	                    min: 0,
	                    max: 100,
	                    axisLine: {
	                        show: true,
	                        lineStyle: {
	                            width:10,
	                            color: [
	                                [
	                                    (item.value-5) / 100, new echarts.graphic.LinearGradient(
	                                        0, 0, 1, 0, [{
	                                                offset: 0,
	                                                color: '#d050f2',
	                                            },
	                                            {
	                                                offset: 1,
	                                                color: "#7b1ddd",
	                                            }
	                                        ]
	                                    )
	                                ],
	                                [
	                                    1, 'rgba(255,255,255, 0)'
	                                ]
	                            ]
	                        }
	                    },
	                    axisTick: {
	                        show: 0,
	                    },
	                    splitLine: {
	                        show: 0,
	                    },
	                    axisLabel: {
	                        show: 0
	                    },
	                    pointer: {
	                        show: true,
	                        length: '110%',
	                        width: 3
	                    },
	                    title: {
	                        show: true,
	                        offsetCenter: [0, '65%'],
	                        color: '#22be6f',
	                        fontSize: 20,
	                        borderRadius: 21,
	                        padding: 5
	                    },
	                    detail: {
	                        show: true,
	                        offsetCenter: [0, 0],
	                        textStyle: {
	                            fontSize: 22,
	                            color: '#22be6f'
	                        },
	                        formatter: [
	                            '{value}' + (item.unit || ''),
	                        ].join('\n'),
	
	                        rich: {
	                            name: {
	                                fontSize: 20,
	                                lineHeight: 10,
	                                color: '#ddd',
	                                padding: [30, 0, 0, 0]
	                            }
	                        }
	                    },
	                    itemStyle: {
	                        normal: {
	                            color: "#c03aec",
	                        }
	                    },
	                    data: [{
	                        value: item.value,
	                        name: item.name
	                    }]
	                }
	            );
	        });
	
	        return result;
	    })()
	});
})