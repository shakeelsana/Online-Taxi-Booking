// Assume that we have a base fare for a ride of $10
const BASE_FARE = 10;

function calculateFare(distance: number, timeOfDay: string, surgeMultiplier: number) {
  let fare = BASE_FARE;
  
  // Adjust fare based on distance
  if (distance > 10) {
    fare += (distance - 10) * 1.5;
  }
  
  // Adjust fare based on time of day
  if (timeOfDay === 'peak') {
    fare *= 1.25;
  } else if (timeOfDay === 'off-peak') {
    fare *= 0.75;
  }
  
  // Adjust fare based on surge multiplier
  fare *= surgeMultiplier;
  
  return fare;
}

// Example usage:
const distance = 15; // in miles
const timeOfDay = 'peak'; // or 'off-peak'
const surgeMultiplier = 2.5; // e.g. during a high-demand period

const fare = calculateFare(distance, timeOfDay, surgeMultiplier);

console.log(`The fare for a ${distance}-mile ride during ${timeOfDay} hours with a surge multiplier of ${surgeMultiplier} is $${fare.toFixed(2)}.`);
