import { AttendanceCollection } from '../../db';
import { GetTimeline } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetTimeline]: async function (gte, lte) {
      const pipeline = [
        {
          $match: {
            date: { $gte: gte, $lte: lte },
          },
        },
        {
          $group: {
            _id: '$employeeName',
            department: { $first: '$department' },
            image: { $first: '$image' },
            timeIn: { $push: '$timeIn' },
            timeOut: { $push: '$timeOut' },
            productivity: { $avg: '$productivity' },
          },
        },
      ];

      const aggregatedData = await AttendanceCollection.rawCollection()
        .aggregate(pipeline)
        .toArray();

      // Format the aggregated data as required
      const formattedData = aggregatedData.map((data) => {
        const timeInFormatted = data.timeIn.map(formatTime);
        const timeOutFormatted = data.timeOut.map(formatTime);

        const totalActiveTime = calculateTotalTime(timeInFormatted, timeOutFormatted);
        const totalShifts = timeInFormatted.filter((time) => time !== '00:00').length;

        const officeTimeAverage = calculateOfficeTimeAverage(totalActiveTime, totalShifts);
        const activeTimeAverage = calculateActiveTimeAverage(totalActiveTime, totalShifts);

        return {
          Name: data._id,
          image: data.image,
          Department: data.department,
          Mon: timeInFormatted[0],
          Tue: timeInFormatted[1],
          Wed: timeInFormatted[2],
          Thu: timeInFormatted[3],
          Fri: timeInFormatted[4],
          Total: totalActiveTime,
          OfficeTimeAverage: officeTimeAverage,
          ActiveTimeAverage: activeTimeAverage,
          Productivity: Math.floor(data.productivity), // Remove decimal for percentage
        };
      });

      return formattedData;
    },
  });
}

function formatTime(time) {
  if (!time) {
    return '00:00'; // Handle missing or invalid time values
  }

  const dateObj = new Date(`2000-01-01T${time}`);
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function calculateTotalTime(timeInArray, timeOutArray) {
  const totalMinutes = timeInArray.reduce((total, timeIn, index) => {
    if (timeIn && timeOutArray[index]) {
      const timeInDate = new Date(`2000-01-01T${timeIn}`);
      const timeOutDate = new Date(`2000-01-01T${timeOutArray[index]}`);
      const diffMilliseconds = timeOutDate - timeInDate;
      return total + diffMilliseconds;
    }
    return total;
  }, 0);

  const totalHours = Math.floor(totalMinutes / 60000 / 60);
  const totalMinutesLeft = Math.floor((totalMinutes / 60000) % 60);

  return `${totalHours.toString().padStart(2, '0')}:${totalMinutesLeft
    .toString()
    .padStart(2, '0')}`;
}

function calculateOfficeTimeAverage(totalActiveTime, totalShifts) {
  const [totalHours, totalMinutes] = totalActiveTime.split(':').map(Number);
  const totalActiveMinutes = totalHours * 60 + totalMinutes;
  const averageMinutes = totalActiveMinutes / totalShifts;

  const averageHours = Math.floor(averageMinutes / 60);
  const averageMinutesLeft = Math.floor(averageMinutes % 60);

  return `${averageHours.toString().padStart(2, '0')}:${averageMinutesLeft
    .toString()
    .padStart(2, '0')}`;
}

function calculateActiveTimeAverage(totalActiveTime, totalShifts) {
  const [totalHours, totalMinutes] = totalActiveTime.split(':').map(Number);
  const totalActiveMinutes = totalHours * 60 + totalMinutes;
  const averageMinutes = totalActiveMinutes / totalShifts;

  const averageHours = Math.floor(averageMinutes / 60);
  const averageMinutesLeft = Math.floor(averageMinutes % 60);

  return `${averageHours.toString().padStart(2, '0')}:${averageMinutesLeft
    .toString()
    .padStart(2, '0')}`;
}
