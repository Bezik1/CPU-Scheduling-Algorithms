import { PHASE_MEAN, STANDARD_PHASE_DEVIATION } from "../const/phase";

export const getRandomPhaseLength = (): number =>{
    let value;
    do {
      value = Math.round(PHASE_MEAN + STANDARD_PHASE_DEVIATION * (Math.random() * 2 - 1))
    } while (value <= 0)
    return value;
}