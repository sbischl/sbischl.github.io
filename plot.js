// This should contain all of the required js code



// Settings (some of these have to be in line with what the R code does that exports the csv files):
var document_root = 'https://sbischl.github.io';
var infinity_cutoff = 6;
var lower_cutoff = -1;

// Generate a global chart variable that can always be accessed:
var mvpfChart;
var governmentCostChart;
var wtpChart;
var wtpCostChart;

// Currently displayed Program:
var currently_displayed_program;

// Bar Chart Div. This one has to be dynamically updated.
var chartDiv = document.querySelector("#barChartDiv")

// Store the mapping of willingness to pay and government net cost in a JSON object:
var variable_mapping = [
    {
        program: "taxReform1990",
        willingness_to_pay: {
            willingness_to_pay: "Tax Reduction",
        },
        government_net_costs: {
            willingness_to_pay: "Tax Reduction",
            fiscal_externality: "Fiscal Externality"
        }
    },
    {
        program: "taxReform2000",
        willingness_to_pay: {
            willingness_to_pay: "Tax Reduction",
        },
        government_net_costs: {
            willingness_to_pay: "Tax Reduction",
            fiscal_externality: "Fiscal Externality"
        }
    },
    {
        program: "BestUpInformationWorkshop",
        willingness_to_pay: {
            net_income_increase: "Lifteime Effect on Net Income",
            bafoeg_cost: "Bafög Receipt",
            bafoeg_repayment: "Bafög Repayment"
        },
        government_net_costs: {
            program_cost: "Workshop Cost",
            tax_revenue_increase: "Lifteime Tax Revenue Increase",
            education_cost: "Education Cost Difference",
            bafoeg_cost: "Bafög Payment",
            bafoeg_repayment: "Bafög Repayment"
        }
    },
    {
        program: "mentoringBalu",
        willingness_to_pay: {
            net_income_increase: "Lifteime Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Cost of Mentor, Mentee pair",
            tax_revenue_increase: "Lifteime Tax Revenue Increase",
            education_cost: "Education Cost Difference"
        }
    },
    {
        program: "G8",
        willingness_to_pay: {
            net_income_increase: "Liftetime Effect on Net Income",
            earlier_labor_market_participation_net_income: "Earlier Labor Force Participation"
        },
        government_net_costs: {
            earlier_labor_market_participation_tax_revenue: "Tax Revenue from Earlier Labor Force Participation",
            tax_revenue_increase: "Lifteime Tax Revenue Decrease",
            education_cost: "Education Cost Difference"
        }
    },
    {
        program: "tuitionFees",
        willingness_to_pay: {
            net_income_increase: "Liftetime Effect on Net Income",
            program_cost: "Tuition Fees"
        },
        government_net_costs: {
            program_cost: "Tuition Fees",
            education_cost: "Education Cost Difference",
            tax_revenue_increase: "Lifteime Tax Revenue Decrease",
        }
    },
    {
        program: "longTraining",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Training Cost",
            tax_revenue_increase: "Tax Revenue Increase"
        }
    },
    {
        program: "shortTraining",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Training Cost",
            tax_revenue_increase: "Tax Revenue Increase"
        }
    },
    {
        program: "practiceFirm",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Participation Cost",
            tax_revenue_increase: "Tax Revenue Increase"
        }
    },
    {
        program: "retraining",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Training Cost",
            tax_revenue_increase: "Tax Revenue Increase"
        }
    },
    {
        program: "classRoomTraining",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Training Cost",
            tax_revenue_increase: "Tax Revenue Increase"
        }
    },
    {
        program: "trainingMeasures",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Training Cost",
            tax_revenue_increase: "Tax Revenue Increase"
        }
    },
    {
        program: "bridgingAllowance",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Cost of Paying Subsidy",
            tax_revenue_increase: "Tax Revenue Increase"
        }
    },
    {
        program: "startupSubsidy",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Cost of Paying Subsidy",
            tax_revenue_increase: "Tax Revenue Increase"
        }
    },
    {
        program: "startupGrant",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Cost of Paying Start up Grant",
            tax_revenue_increase: "Tax Revenue Increase"
        }
    },
    {
        program: "trainingVoucher",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Training Cost",
            tax_revenue_increase: "Tax Revenue Increase"
        }
    },
    {
        program: "speedLimitA3",
        willingness_to_pay: {
            cost_increased_travel_time: "Cost of Longer Travel Time",
            private_safer_traffic_valuation: "Private Valuation of fewer Accidents",
            private_fuel_cost_saving: "Lower Fuel Consumption",
            local_emission_reduction: "Less local Emissions",
            co2_emission_reducation: "Less CO2 Emissions"
        },
        government_net_costs: {
            public_safer_traffic_valuation: "Public Valuation of fewer Accidents",
            energy_tax_loss: "Energy Tax Loss",
            value_added_tax_loss: "VAT Tax Loss"
        }
    },
    {
        program: "speedLimitA61",
        willingness_to_pay: {
            cost_increased_travel_time: "Cost of Longer Travel Time",
            private_safer_traffic_valuation: "Private Valuation of fewer Accidents",
            private_fuel_cost_saving: "Lower Fuel Consumption",
            local_emission_reduction: "Less local Emissions",
            co2_emission_reducation: "Less CO2 Emissions"
        },
        government_net_costs: {
            public_safer_traffic_valuation: "Public Valuation of fewer Accidents",
            energy_tax_loss: "Energy Tax Loss",
            value_added_tax_loss: "VAT Tax Loss"
        }
    },
    {
        program: "jobCreationSchemes",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Cost of Job Creation Scheme",
            tax_revenue_increase: "Tax Revenue Increase",
            benefit_receipt: "Effect on Welfare Benefits"
        }
    },
    {
        program: "oneEuroJobs",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Cost of Job Creation Scheme",
            tax_revenue_increase: "Tax Revenue Increase",
            benefit_receipt: "Effect on Welfare Benefits"
        }
    },
    {
        program: "subsidizedJobOpportunities",
        willingness_to_pay: {
            net_income_increase: "Effect on Net Income"
        },
        government_net_costs: {
            program_cost: "Cost of Job Creation Scheme",
            tax_revenue_increase: "Tax Revenue Increase",
            benefit_receipt: "Effect on Welfare Benefits"
        }
    }
]

// Store a unmodified, easy to access version of all programs:
var unmodified_dataset;

// This counts the number of categories / or datasets in the chart.js context that have been added so far
var category_counter_mvpf = 0;
var bar_counter = 1;

async function readcsv(csv_location) {
    var csv_as_array;
    await jQuery.get(csv_location, function (data) {
        // Calling toObject. Javascript's typeof() function calls the resulting "thing" a object. But to me this looks like an array that contains key-value pairs (= objects??).
        // When calling toArrays. We would loose the key for each of the values and would have to infer the key from the position in the array.
        // -> Would be inconvenient
        csv_as_array = jQuery.csv.toObjects(data);
    });
    unmodified_dataset = JSON.parse(JSON.stringify(csv_as_array));
    return csv_as_array;
}

function generateDatasets(csv_as_array) {
    // This stores the name or in my context the type of program (i.e. something like education policy, tax reform ...) of all the datasets we need to construct
    var datasetsLabels = [];
    // The actual dataSets that will eventually be returned
    var datasets = [];
    var i;
    for (i = 0; i < csv_as_array.length; i++) {
        var current_observation = csv_as_array[i];

        // Check if the dataset already exists. If not add it.
        if (!datasetsLabels.includes(current_observation.category)) {
            datasetsLabels.push(current_observation.category);
            datasets.push(generateEmptyDataset(current_observation.category));
        }
        // Add current observation to the correct dataset:

        // First get the relevant dataset
        correctDataset = datasets.filter(dataset => {
            return dataset.label === current_observation.category;
        })[0];

        // Now add the observation
        correctDataset.data.push(current_observation);
    }

    // Now the csv has been read. Apply the censoring
    censorValues(datasets);

    return (datasets);
}

function censorValues(datasets) {
    var i;
    var j;
    var k;
    for (i = 0; i < datasets.length; i++) {
        current_dataset = datasets[i].data;
        for (j = 0; j < current_dataset.length; j++) {
            for (k in current_dataset[j]) {
                if (k == "mvpf") {
                    if (current_dataset[j][k] > infinity_cutoff) {
                        current_dataset[j][k] = infinity_cutoff;
                    }
                    else if (current_dataset[j][k] < lower_cutoff) {
                        current_dataset[j][k] = lower_cutoff;
                    }
                    else if (current_dataset[j][k] == "Inf") {
                        current_dataset[j][k] = infinity_cutoff + 1;
                    }
                }
            }
        }
    }
}

function generateEmptyDataset(datasetLabel) {
    category_counter_mvpf++;
    return ({
        label: datasetLabel,
        data: [],
        backgroundColor: selectColor(category_counter_mvpf, true),
        borderColor: selectColor(category_counter_mvpf),
        pointHoverRadius: 7,
        pointRadius: 5
    });
}

async function updateGraphAssumptions() {
    var csvLocation = getCSVLocation(getGraphAssumptions());
    readcsv(csvLocation).then(csv => updateGraphDataSet(csv));

    // We also have to update the HTML on the right side
}

function updateAxis(axis, value, label) {
    if (axis === "x") {
        // Update the value to plot
        mvpfChart.options.parsing.xAxisKey = value;
        mvpfChart.options.scales = getScales(variable = value, xLab = label, ylab = mvpfChart.options.scales.y.scaleLabel.labelString);
    }
    else if (axis === "y") {
        mvpfChart.options.parsing.yAxisKey = value;
        mvpfChart.options.scales = getScales(variable = value, xLab = mvpfChart.options.scales.x.scaleLabel.labelString, ylab = label);
    }
    mvpfChart.update();
}

function getScales(variable,
    xLab = mvpfChart.options.scales.x.scaleLabel.labelString,
    yLab = mvpfChart.options.scales.y.scaleLabel.labelString) {
    if (variable == "mvpf") {
        return ({
            y: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: yLab
                },
                ticks: {
                    min: -1,
                    max: 7,
                    stepSize: 1,
                    callback: function (value, index, values) {
                        if (value == 7) {
                            return "∞";
                        }
                        else if (value == infinity_cutoff) {
                            return "≥" + infinity_cutoff;
                        }
                        else if (value == lower_cutoff) {
                            return "≤" + lower_cutoff;
                        }
                        else {
                            return value;
                        }
                    }
                }
            },
            x: {
                display: true,
                gridLines: {
                    display: false
                },
                scaleLabel: {
                    display: true,
                    labelString: xLab
                },
                ticks: {
                    maxTicksLimit: 6,
                    callback: function (value, index, values) {
                        return value;
                    }
                }
            }
        });
    }
    if (variable == "willingness_to_pay") {
        return ({
            y: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: yLab
                },
            },
            x: {
                display: true,
                gridLines: {
                    display: false
                },
                scaleLabel: {
                    display: true,
                    labelString: xLab
                },
                ticks: {
                    maxTicksLimit: 6,
                    callback: function (value, index, values) {
                        return value;
                    }
                }
            }
        });
    }
    else {
        return ({
            y: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: yLab
                }
            },
            x: {
                display: true,
                gridLines: {
                    display: false
                },
                scaleLabel: {
                    display: true,
                    labelString: xLab
                },
                ticks: {
                    maxTicksLimit: 6,
                    callback: function (value, index, values) {
                        return value;
                    }
                }
            }
        });
    }
}

function updateGraphDataSet(csv_as_array) {
    // Update the main Chart
    var updatedDatasets = generateDatasets(csv_as_array);
    var i;
    for (i = 0; i < updatedDatasets.length; i++) {
        mvpfChart.data.datasets[i].data = updatedDatasets[i].data;
    }
    mvpfChart.update();

    // Update Bar Charts
    var range = getScalesMinMax(currently_displayed_program);

    if (governmentCostChart) {
        updatedDatasets = generateBarData(csv_as_array, "government_net_costs", currently_displayed_program);
        for (i = 0; i < updatedDatasets.length; i++) {
            governmentCostChart.data.datasets[i].data = updatedDatasets[i].data;
        }
        governmentCostChart.options.scales.x.min = -range;
        governmentCostChart.options.scales.x.max = range;
        governmentCostChart.update();
    }
    if (wtpChart) {
        updatedDatasets = generateBarData(csv_as_array, "willingness_to_pay", currently_displayed_program);
        for (i = 0; i < updatedDatasets.length; i++) {
            wtpChart.data.datasets[i].data = updatedDatasets[i].data;
        }
        wtpChart.options.scales.x.min = -range;
        wtpChart.options.scales.x.max = range;
        wtpChart.update();
    }
    if (wtpCostChart) {
        updatedDatasets = generateBarData(csv_as_array, "mvpf", currently_displayed_program);
        for (i = 0; i < updatedDatasets.length; i++) {
            wtpCostChart.data.datasets[i].data = updatedDatasets[i].data;
        }
        wtpCostChart.options.scales.x.min = -range;
        wtpCostChart.options.scales.x.max = range;
        wtpCostChart.update();
    }
}

function getCSVLocation(specifiedAssumptions) {
    return (document_root + "/csv/" + specifiedAssumptions.join("") + ".csv");
}

function getGraphAssumptions() {
    // The assumption Select Box Ids have to be in the correct order!!
    // The correct order is given by order of the assumptions in the csv files
    var assumptionSelectBoxesIds = ["discountRateAssumption", "taxRateAssumption"]
    var specifiedAssumptions = []

    var i;
    for (i = 0; i < assumptionSelectBoxesIds.length; i++) {
        specifiedAssumptions.push(document.getElementById(assumptionSelectBoxesIds[i]).value);
    }
    return (specifiedAssumptions);
}

function highlightProgram(program) {
    currently_displayed_program = program;
    generateLeftSideHTMLCharts(program);
    openTooltip(program);
}

function openTooltipCurrentProgram() {
    if (currently_displayed_program) {
        openTooltip(currently_displayed_program);
    }
}

function openTooltip(program) {
    // Find coordinates of point:
    var coordinates;
    var i = 0
    while (true) {
        try {
            var currentDataSetMeta = mvpfChart.getDatasetMeta(i);
            // Check if program is in this Meta:
            var j
            var current_data = Object.values(currentDataSetMeta._dataset.data)
            for (j = 0; j < current_data.length; j++) {
                if (current_data[j].program === program) {
                    coordinates = currentDataSetMeta.data[j].getCenterPoint();
                }
            }
            i++;
        }
        catch (e) {
            i++;
            break;
        }
    }

    // Thx; @jwerre https://stackoverflow.com/questions/39283177/programmatically-open-and-close-chart-js-tooltip
    var mouseMoveEvent, rectangle;
    rectangle = mvpfChart.canvas.getBoundingClientRect();

    mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: rectangle.left + coordinates.x,
        clientY: rectangle.top + coordinates.y
    });
    mvpfChart.canvas.dispatchEvent(mouseMoveEvent);

}

function getUnmodifiedProgram(program_name) {
    var i;
    for (i = 0; i < unmodified_dataset.length; i++) {
        if (unmodified_dataset[i].program_name == program_name) {
            return unmodified_dataset[i];
        }
    }
    console.log("program not found");
}

function getUnmodifiedbyIdentProgram(programIdent) {
    var j;
    for (j = 0; j < unmodified_dataset.length; j++) {
        if (unmodified_dataset[j].program == programIdent) {
            return unmodified_dataset[j];
        }
    }
    console.log("program not found");
}


function selectColor(number, background = false) {
    background_opa = 0.7
    foreground_opa = 0.9
    if (number == 1) {
        if (background) {
            return "rgba(46,139,87," + background_opa + ")"
        }
        else {
            return "rgba(46,139,87," + foreground_opa + ")"
        }
    }
    else if (number == 2) {
        if (background) {
            return "rgba(30,144,255," + background_opa + ")"
        }
        else {
            return "rgba(30,144,255," + foreground_opa + ")"
        }
    }
    else if (number == 3) {
        if (background) {
            return "rgba(255,165,0," + background_opa + ")"
        }
        else {
            return "rgba(255,165,0," + foreground_opa + ")"
        }
    }
    else if (number == 4) {
        if (background) {
            return "rgba(220,20,60," + background_opa + ")"
        }
        else {
            return "rgba(220,20,60," + foreground_opa + ")"
        }
    }
    else if (number == 5) {
        if (background) {
            return "rgba(0,128,128," + background_opa + ")"
        }
        else {
            return "rgba(0,128,128," + foreground_opa + ")"
        }
    }
    else if (number == 6) {
        if (background) {
            return "rgba(0,0,139," + background_opa + ")"
        }
        else {
            return "rgba(0,0,139," + foreground_opa + ")"
        }
    }
    else if (number == 7) {
        if (background) {
            return "rgba(255,20,147," + background_opa + ")"
        }
        else {
            return "rgba(255,20,147," + foreground_opa + ")"
        }
    }
    else if (number == 8) {
        if (background) {
            return "rgba(255,140,0," + background_opa + ")"
        }
        else {
            return "rgba(255,140,0," + foreground_opa + ")"
        }
    }
    else if (number == 9) {
        if (background) {
            return "rgba(0,255,127" + background_opa + ")"
        }
        else {
            return "rgba(0,255,127," + foreground_opa + ")"
        }
    }
    else if (number == 10) {
        if (background) {
            return "rgba(72,61,139," + background_opa + ")"
        }
        else {
            return "rgba(72,61,139," + foreground_opa + ")"
        }
    }
    else if (number == 11) {
        if (background) {
            return "rgba(169,169,169," + background_opa + ")"
        }
        else {
            return "rgba(169,169,169," + foreground_opa + ")"
        }
    }

}

function addAllPositivesSubtractAllNegatives(array) {
    var negative = 0;
    var positive = 0;
    var i;
    for (i = 0; i < array.length; i++) {
        if (array[i] > 0) {
            positive += array[i];
        }
        else {
            negative -= array[i];
        }
    }
    return (Math.max(Math.abs(positive), Math.abs(negative)));
}

function getScalesMinMax(program) {
    var relevant_datapoint = unmodified_dataset.find(function (datapoint) {
        return (datapoint.program === program);
    });
    var max = addAllPositivesSubtractAllNegatives([
        Math.abs(parseFloat(relevant_datapoint["willingness_to_pay"]),
            -Math.abs(parseFloat(relevant_datapoint["government_net_costs"])))
    ]);
    var mappingEntry;

    var i;
    for (i = 0; i < variable_mapping.length; i++) {
        if (variable_mapping[i].program === program) {
            mappingEntry = variable_mapping[i];
            break;
        }
    }

    barComponents = mappingEntry["willingness_to_pay"];
    var array = [];
    var component;
    for (component in barComponents) {
        array.push(parseFloat(relevant_datapoint[component]));
    }
    max = Math.max(addAllPositivesSubtractAllNegatives(array), max);


    barComponents = mappingEntry["government_net_costs"];
    array = [];
    for (component in barComponents) {
        array.push(parseFloat(relevant_datapoint[component]));
    }
    max = Math.max(addAllPositivesSubtractAllNegatives(array), max);

    return (max);
}

function generateBarData(csv_as_array, variable_to_plot, program) {
    var datasets = [];
    var barComponents;
    var relevant_datapoint = unmodified_dataset.find(function (datapoint) {
        return (datapoint.program === program);
    });

    if (variable_to_plot === "mvpf") {
        datasets.push({
            label: "Government Net Cost",
            data: [parseFloat(relevant_datapoint["government_net_costs"])],
            backgroundColor: selectColor(bar_counter, true),
            borderColor: selectColor(bar_counter),
        });
        datasets.push({
            label: "Willingness to Pay",
            data: [relevant_datapoint["willingness_to_pay"]],
            backgroundColor: selectColor(bar_counter + 1, true),
            borderColor: selectColor(bar_counter + 1),
        });
        bar_counter += 2;
        return (datasets);
    }
    var i;
    for (i = 0; i < variable_mapping.length; i++) {
        if (variable_mapping[i].program === program) {
            barComponents = variable_mapping[i][variable_to_plot];
            break;
        }
    }
    var component;
    for (component in barComponents) {
        datasets.push({
            label: barComponents[component],
            data: [relevant_datapoint[component]],
            backgroundColor: selectColor(bar_counter, true),
            borderColor: selectColor(bar_counter)
        });
        bar_counter++;
    }
    return (datasets);
}

function drawBarChart(csv_as_array, variable_to_plot, program, chartElement) {
    currently_displayed_program = program;
    // Set Font size
    Chart.defaults.font.size = 14;
    Chart.defaults.font.family = 'Open Sans';

    // Get Plotting range
    var range = getScalesMinMax(program);

    var smallscreen = jQuery(window).width() < 1450 ? true : false

    barChart = new Chart(chartElement, {
        type: 'bar',
        data: {
            datasets: generateBarData(csv_as_array, variable_to_plot, program)
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            aspectRatio: smallscreen ? 2 : 4,
            legend: {
                position: 'bottom',
                usePointStyle: true
            },
            scales: {
                x: {
                    stacked: variable_to_plot == "mvpf" ? false : true,
                    ticks: {
                        maxTicksLimit: 3
                    },
                    gridLines: {
                        drawOnChartArea: false
                    },
                    min: -range,
                    max: range
                },
                y: {
                    stacked: variable_to_plot == "mvpf" ? false : true,
                    gridLines: {
                        drawBorder: false,
                        display: false
                    }
                }
            },
            tooltips: {
                enabled: true,
                displayColors: false,
                mode: 'nearest',
                callbacks: {
                    title: function (data) {
                        return null;
                    }
                }
            }
        }
    });
    return (barChart);
}

function drawMVPFChart(csv_as_array) {
    // Set Font size
    Chart.defaults.font.size = 14;
    Chart.defaults.font.family = 'Open Sans';

    // Number Of Programs at Tooltip.
    var tooltip_number = 1;

    var mvpfChartElement = document.getElementById('mvpfChart');
    mvpfChart = new Chart(mvpfChartElement, {
        type: 'scatter',
        data: {
            datasets: generateDatasets(csv_as_array)
        },
        options: {
            responsive: true,
            aspectRatio: 1.4,
            parsing: {
                yAxisKey: 'mvpf',
                xAxisKey: 'year'
            },
            scales: getScales("mvpf", "Year", "Marginal Value of Public Funds"),
            legend: {
                position: 'bottom',
                usePointStyle: true
            },
            hover: {
                mode: "point"
            },
            tooltips: {
                enabled: true,
                displayColors: false,
                mode: 'point',
                callbacks: {
                    title: function (data) {
                        if (data.length > 1) {
                            tooltip_number = data.length;
                            return null;
                        }
                        tooltip_number = 1;
                        return data[0].dataset.data[data[0].dataIndex]["program_name"];
                    },
                    label: function (data) {
                        // Get the name of the program. Since we have censored the data to draw the graph we need to look up the true values:
                        var program_name = data.dataset.data[data.dataIndex]["program_name"];
                        var unmodified_datapoint = getUnmodifiedProgram(program_name);
                        var tooltip = [];
                        var mvpfIsInfinity = unmodified_datapoint["mvpf"] == "Inf" ? true : false

                        if (tooltip_number > 1) {
                            tooltip.push(program_name + ":");
                        }

                        tooltip.push("Willingness to Pay:" + +parseFloat(unmodified_datapoint["willingness_to_pay"]).toFixed(2));
                        tooltip.push("Government Net Cost: " + +parseFloat(unmodified_datapoint["government_net_costs"]).toFixed(2));
                        tooltip.push("MVPF: " + (mvpfIsInfinity ? "∞" : +parseFloat(unmodified_datapoint["mvpf"]).toFixed(2)));

                        if (tooltip_number > 1) {
                            tooltip.push("");
                        }
                        return tooltip;
                    }

                }
            }
        }
    });
    mvpfChartElement.onclick = function (evt) {
        //This is totally weird, see https://github.com/chartjs/Chart.js/issues/2292
        //But it works now!!!!!
        var activePoints = mvpfChart.getElementsAtEventForMode(evt, 'point', mvpfChart.options);
        var firstPoint = activePoints[0];
        // activePoints is undefined in case no point is pressed. if(undefined) is false, hence this if condition prevents, 
        // the code from being executed if nothing is clicked.
        if (activePoints[0]) {
            var clicked_program = mvpfChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index].program;
            changeBarChartProgram(clicked_program);
        }
    };
}

function changeBarChartProgram(program) {
    currently_displayed_program = program;
    generateLeftSideHTMLCharts(program);
    /*
    currently_displayed_program = program;

    bar_counter = 1;
    var range = getScalesMinMax(program);

    governmentCostChart.data.datasets = generateBarData(unmodified_dataset, "government_net_costs", program);
    governmentCostChart.options.scales.x.min = -range;
    governmentCostChart.options.scales.x.max = range;
    governmentCostChart.update();

    wtpChart.data.datasets = generateBarData(unmodified_dataset, "willingness_to_pay", program);
    wtpChart.options.scales.x.min = -range;
    wtpChart.options.scales.x.max = range;
    wtpChart.update();

    wtpCostChart.data.datasets = generateBarData(unmodified_dataset, "mvpf", program);
    wtpCostChart.options.scales.x.min = -range;
    wtpCostChart.options.scales.x.max = range;
    wtpCostChart.update();
    */
}

//Dynamic Page Generation:
function generateProgramsHTML() {
    // This function can generate plots for all programs and add them to an html div element. This turned out to be complicated. 
    // I think I found a fix for the aspect ratio problem. But I like the simplicity of the current solution.
    //var allProgramsDiv = document.querySelector("#allProgram");
    var allBarCharts = [];

    var i = 0;
    for (i = 0; i < variable_mapping.length; i++) {
        var current_program = variable_mapping[i].program;
        singleHTML = generateSingleProgramHTML(current_program);
        allProgramsDiv.appendChild(singleHTML.singleProgramDiv);
        bar_counter = 1;
        drawBarChart(unmodified_dataset, "government_net_costs", current_program, singleHTML.chartElements[0]);
        drawBarChart(unmodified_dataset, "willingness_to_pay", current_program, singleHTML.chartElements[1]);
        drawBarChart(unmodified_dataset, "mvpf", current_program, singleHTML.chartElements[2]);
        allBarCharts.push(singleHTML.chartElements);
    }

}

function generateLeftSideHTMLCharts(program) {
    chartDiv.innerHTML = "";
    bar_counter = 1;
    var html = generateSingleProgramHTML(program);
    chartDiv.appendChild(html.singleProgramDiv);
    governmentCostChart = drawBarChart(unmodified_dataset, "government_net_costs", program, html.chartElements[0]);
    wtpChart = drawBarChart(unmodified_dataset, "willingness_to_pay", program, html.chartElements[1]);
    wtpCostChart = drawBarChart(unmodified_dataset, "mvpf", program, html.chartElements[2]);
}

function generateSingleProgramHTML(program) {
    program_data = getUnmodifiedbyIdentProgram(program);

    var singleProgramDiv = document.createElement('div');
    singleProgramDiv.className = "singleProgramDiv";

    // Headline
    var programHeadLine = document.createElement('h3');
    programHeadLine.className = "programHeadLine";
    programHeadLine.textContent = program_data.program_name;
    singleProgramDiv.appendChild(programHeadLine);

    //Description
    var programDescription = document.createElement('p');
    programHeadLine.className = "programDescription";
    programDescription.innerHTML = "<strong>Short Description:</strong> <br>" + program_data.short_description;
    singleProgramDiv.appendChild(programDescription);

    var gccHeadline = document.createElement('div');
    gccHeadline.className = "chartHeadline";
    gccHeadline.innerHTML = "<strong>Government Net Cost:</strong>";
    singleProgramDiv.appendChild(gccHeadline);
    var governmentCostChartElement = document.createElement('canvas');
    governmentCostChartElement.className = "barPlotElement";
    singleProgramDiv.appendChild(governmentCostChartElement);

    var wtpHeadline = document.createElement('div');
    wtpHeadline.className = "chartHeadline";
    wtpHeadline.innerHTML = "<strong>Willingness to Pay:</strong>";
    singleProgramDiv.appendChild(wtpHeadline);
    var wtpChartElement = document.createElement('canvas');
    wtpChartElement.className = "barPlotElement";
    singleProgramDiv.appendChild(wtpChartElement);

    var mvpfHeadline = document.createElement('div');
    mvpfHeadline.className = "chartHeadline";
    mvpfHeadline.innerHTML = "<strong>Government Net Cost & Willingness to Pay:</strong>";
    singleProgramDiv.appendChild(mvpfHeadline);
    var wtpCostChartElement = document.createElement('canvas');
    wtpCostChartElement.className = "barPlotElement";
    singleProgramDiv.appendChild(wtpCostChartElement);

    //Cite papers
    var html = "<strong>Relevant Literature:</strong> <br>"
    var links = program_data.Links.split(";");
    var authors = program_data.Papers.split(";");
    var i;
    for (i = 0; i < authors.length; i++) {
        html += authors[i] + ', <a href="' + links[i] + '" target="_blank">IDEAS Link</a>' + " <br>";
    }

    var sources = document.createElement('p');
    sources.className = "programDescription";
    sources.innerHTML = html;
    singleProgramDiv.appendChild(sources);

    return {
        singleProgramDiv: singleProgramDiv,
        chartElements: [governmentCostChartElement, wtpChartElement, wtpCostChartElement]
    };
}

function populatePrograms() {
    var selection = document.querySelector('#highlightProgram');
    var i;
    for (i in variable_mapping) {
        var current_program = getUnmodifiedbyIdentProgram(variable_mapping[i].program);
        var option = document.createElement("option");
        option.value = current_program.program;
        option.innerHTML = current_program.program_name;
        selection.appendChild(option);
    }
}

function main() {
    readcsv(document_root.concat("/csv/default.csv")).then(function (csv) {
        drawMVPFChart(csv); populatePrograms();
        populatePrograms();
        //generateLeftSideHTMLCharts("taxReform1990");
    });

}

main();
