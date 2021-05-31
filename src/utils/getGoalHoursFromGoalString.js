export default function getGoalHoursFromGoalString(goal) {
  return parseInt(goal.split(':')[0]);
}