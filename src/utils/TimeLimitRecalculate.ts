export const calcTimeLimit = (h: number, m: number) => {
  let days = 0;
  let hours = h;
  let minutes = m;

  if (minutes > 60) {
    let additionalHours = Math.floor(m / 60);
    minutes = m % 60;
    hours = hours + additionalHours;
  }
  if (hours > 24) {
    days = Math.floor(h / 24);
    hours = h % 24;
  }
  return timeLimitString(days, hours, minutes);
};

export const timeLimitString = (d: number, h: number, m: number) => {
  if (d === 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
    else return `${String(d)}.${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
};

export const parseTimeLimit = (timeLimit: string) => {
    let hours = 0;
    let minutes = 0;
    if(timeLimit.includes('.')) {
        const days = timeLimit.split('.')[0];
        timeLimit = timeLimit.split('.')[1];
        if (days) {
            hours = parseInt(days) * 24;
        }
    }
    if(timeLimit.includes(':')) {
        hours += parseInt(timeLimit.split(':')[0]);
        minutes = parseInt(timeLimit.split(':')[1]);
    }
    return { hours, minutes };
}