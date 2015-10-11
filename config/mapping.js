/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */

module.exports = {
    session: {
        'Schedule name': 'schedule-name',
        'Environment name': 'environment-name',
        'Schedule run date': 'schedule-run-date',
        'Animal ID': 'animal-id',
        'Application_Version': 'application-version',
        'Max_Number_Trials': 'max-number-trials',
        'Max_Schedule_Time': 'max-schedule-time',
        'Schedule_Description': 'schedule-description',
        'Schedule_Start_Time': 'schedule-start-time',
        'Group ID': 'group-id',
        'User': 'user',
        'Notes': 'notes',
        'End Summary - Condition \\(([0-9]+)\\)': 'summary.condition',
        'End Summary - Trials Completed \\(([0-9]+)\\)': 'summary.trials-completed',
        'End Summary - All Trials Completed \\(([0-9]+)\\)': 'summary.all-trials-completed',
        'End Summary - Percentage Correct \\(([0-9]+)\\)': 'summary.percentage-correct',
        'End Summary - Left ITI touches \\(([0-9]+)\\)': 'summary.iti-touches.left',
        'End Summary - Centre ITI touches \\(([0-9]+)\\)': 'summary.iti-touches.center',
        'End Summary - Right ITI touches \\(([0-9]+)\\)': 'summary.iti-touches.right',
        'End Summary - Left Blank Touches - [a-zA-Z\\s]+ \\(([0-9]+)\\)': 'summary.blank-touches.left',
        'End Summary - Centre Blank Touches - [a-zA-Z\\s]+ \\(([0-9]+)\\)': 'summary.blank-touches.center',
        'End Summary - Right Blank Touches - [a-zA-Z\\s]+ \\(([0-9]+)\\)': 'summary.blank-touches.right',
        'End Summary - Corrects at Distance [0-9]+ -(.*)': 'summary.corrects-at-distance',
        'End Summary - Total at Distance [0-9]+ -(.*)': 'summary.total-at-distance',
        'End Summary - \\% correct at dist [0-9]+ \\(([0-9]+)\\)': 'summary.percentage-correct-at-distance'
    },
    trial: {
        'Trial Analysis - Condition \\(([0-9]+)\\)': 'condition',
        'Trial Analysis - No\\. Correct \\(([0-9]+)\\)': 'number-correct',
        'Trial Analysis - Trial No\\. \\(([0-9]+)\\)': 'trial-number',
        'Trial Analysis - Distance gp \\(([0-9]+)\\)': 'distance-gp',
        'Trial Analysis - Pattern No\\. \\(([0-9]+)\\)': 'pattern-number',
        'Trial Analysis - Sample side \\(([0-9]+)\\)': 'sample-side',
        'Trial Analysis - Left ITI Touches \\(([0-9]+)\\)': 'iti-touches.left',
        'Trial Analysis - Right ITI Touches \\(([0-9]+)\\)': 'iti-touches.right',
        'Trial Analysis - Centre ITI Touches \\(([0-9]+)\\)': 'iti-touches.center',
        'Trial Analysis - Left Blank Touches - [a-zA-Z\\s]+ \\(([0-9]+)\\)': 'blank-touches.left',
        'Trial Analysis - Right Blank Touches - [a-zA-Z\\s]+ \\(([0-9]+)\\)': 'blank-touches.right',
        'Trial Analysis - Centre Blank Touches - [a-zA-Z\\s]+ \\(([0-9]+)\\)': 'blank-touches.center',
        'Trial Analysis - Reward Collection Latency \\(([0-9]+)\\)': 'reward-collection-latency',
        'Trial Analysis - Correct Image Response Latency \\(([0-9]+)\\)': 'correct-image-response-latency',
        'Trial Analysis - Incorrect Image Latency \\(([0-9]+)\\)': 'incorrect-image-latency'
    }
};
