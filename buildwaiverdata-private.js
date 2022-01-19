const fs = require('fs');
const crypto = require('crypto');
const axios = require('axios');
const dataDir = './_data';
let waiversFile;
let oldData;
let newData;
const DATAURL =
  'https://portal-test.forms.gov/mia-test/madeinamericanonavailabilitywaiverrequest/submission?created__gt=2021-10-13';
const GITHUBURL =
  'https://api.github.com/repos/GSA/made-in-america-data-private/contents/waivers-data.json';
const API_KEY = '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';

async function loadData() {
  try {
    await smokeCheck();
    await addNewWaivers();
    await updateReviewedWaivers();
    await pushtoRepo(oldData);
    console.log('COMPLETED');
  } catch (err) {
    console.log(`${err}`);
  }
}

async function getData(url) {
  try {
    console.log('async data request...');
    const result = await axios(url, {
      method: 'get',
      headers: {
        'x-token': 'Tzeuoee54yuZoYrYXpjJ5SMLNEJP7c',
        Authorization: 'Bearer ' + API_KEY,
      },
    });
    const sha = result.data.sha;
    const mappedData = (ajaxdata) => {
      if (ajaxdata.data.encoding === 'base64') {
        console.log('Converting BASE 64 to UTF-8');
        let buffObj = Buffer.from(ajaxdata.data.content, 'base64');
        let text = buffObj.toString('utf-8');
        ajaxdata.data = JSON.parse(text);
      }

      return ajaxdata.data.map((item) => {
        let temp = Object.assign({}, item);
        if (
          temp.data.expectedMaximumDurationOfTheRequestedWaiver ===
          'between2And3Years'
        ) {
          temp.data.expectedMaximumDurationOfTheRequestedWaiver =
            'Between 2 and 3 years';
        }
        if (
          temp.data.expectedMaximumDurationOfTheRequestedWaiver ===
          'instantDeliveryOnly'
        ) {
          temp.data.expectedMaximumDurationOfTheRequestedWaiver =
            'Instant Delivery Only';
        }
        if (
          temp.data.expectedMaximumDurationOfTheRequestedWaiver === '06Months'
        ) {
          temp.data.expectedMaximumDurationOfTheRequestedWaiver =
            '0 - 6 months';
        }
        if (
          temp.data.expectedMaximumDurationOfTheRequestedWaiver ===
          'between6MonthsAnd1Year'
        ) {
          temp.data.expectedMaximumDurationOfTheRequestedWaiver =
            'Between 6 months and 1 year';
        }
        if (
          temp.data.expectedMaximumDurationOfTheRequestedWaiver ===
          'between1And2Years'
        ) {
          temp.data.expectedMaximumDurationOfTheRequestedWaiver =
            'Between 1 and 2 years';
        }
        if (
          temp.data.expectedMaximumDurationOfTheRequestedWaiver ===
          'between3And5Years'
        ) {
          temp.data.expectedMaximumDurationOfTheRequestedWaiver =
            'Between 3 and 5 years';
        }
        if (
          temp.data.expectedMaximumDurationOfTheRequestedWaiver ===
          'moreThan5Years'
        ) {
          temp.data.expectedMaximumDurationOfTheRequestedWaiver =
            'More than 5 years';
        }
        if (temp.data.procurementStage === 'postSolicitation') {
          temp.data.procurementStage = 'Post-solicitation';
        }
        if (temp.data.procurementStage === 'preSolicitation') {
          temp.data.procurementStage = 'Pre-solicitation';
        }
        if (temp.data.waiverCoverage === 'individualWaiver') {
          temp.data.waiverCoverage = 'Individual waiver';
        }
        if (temp.data.waiverCoverage === 'individualWaiver') {
          temp.data.waiverCoverage = 'Individual waiver';
        }
        if (temp.data.waiverCoverage === 'multiProcurementWaiver') {
          temp.data.waiverCoverage = 'Multi-procurement waiver';
        }

        return temp;
      });
    };

    let final = mappedData(result);
    if (sha) {
      console.log('including sha value...');
      final['sha'] = sha;
      return final;
    }
    return final;
  } catch (err) {
    console.error(err);
  }
}

async function smokeCheck() {
  try {
    console.log('checking if files exist...');
    if (!fs.existsSync(`${dataDir}/waivers-data.json`)) {
      waiversFile = `${dataDir}/waivers-data.json`;
      console.log('file not here');
      fs.writeFileSync(waiversFile, JSON.stringify([]), (err) => {
        if (err) {
          console.log('err', err);
        } else {
          console.log('data written to file');
        }
      });
      await getData(DATAURL).then((res) => {
        fs.writeFileSync(waiversFile, JSON.stringify(res), 'utf-8', null, 2);
        oldData = JSON.parse(fs.readFileSync(waiversFile, 'utf-8'));
        return;
      });
    } else {
      oldData = JSON.parse(
        fs.readFileSync(`${dataDir}/waivers-data.json`, 'utf-8')
      );
      console.log('Smoke Check completed');
    }
  } catch (err) {
    console.error('error in smoke test', err);
  }
}

async function addNewWaivers() {
  //if there is no new data in the directory
  if (!fs.existsSync(`${dataDir}/current-waivers.json`)) {
    //get the data and write it to json
    await getData(DATAURL).then((res) => {
      console.log('ADDING NEW WAIVERS!!!!!!');
      fs.writeFileSync(
        `${dataDir}/current-waivers.json`,
        JSON.stringify(res),
        'utf-8',
        null,
        2
      );
      //and lets call it newData
      newData = JSON.parse(
        fs.readFileSync(`${dataDir}/current-waivers.json`, 'utf-8')
      );
      // update our waiver data file
      const diff = newData.filter(
        (n) => !oldData?.some((item) => n._id === item._id)
      );
      console.log('here2');
      //compare objects that are not in old and write them into the new file
      fs.writeFileSync(`${newData}`, JSON.stringify(diff), 'utf-8');
      console.log('FINISHED ADDING NEW WAIVERS...');
      console.log(
        'There are ' + newData.length + ' waivers in the current file'
      );
      return;
    });
  }
}

async function pushtoRepo(data) {
  await ajaxMethod(data, '');
}

async function updateRepo(data) {
  console.log('getting SHA Value for Update');
  let response = await getData(GITHUBURL);
  const shaValue = response.sha;
  ajaxMethod(data, shaValue);
}

updateReviewedWaivers = () => {
  console.log('Updating Waivers with new modified date');
  let modifiedWaivers = compareJSONsforChangesInModifiedDate(oldData, newData);
  let final = newData.map(
    (obj) => modifiedWaivers.find((o) => obj._id === o._id) || obj
  );
  fs.writeFileSync(
    `${dataDir}/waivers-data.json`,
    JSON.stringify(final),
    'utf-8'
  );
  fs.unlinkSync(`${dataDir}/current-waivers.json`);
};

function compareJSONsforChangesInModifiedDate(prev, current) {
  var result = current.filter(
    ({ modified }) =>
      !prev.some(
        (o) => new Date(o.modified).getTime() === new Date(modified).getTime()
      )
  );
  return result;
}

function ajaxMethod(data, shaValue) {
  let buffered = Buffer.from(JSON.stringify(data)).toString('base64');
  var jsondata = JSON.stringify({
    message: 'uploading a json file file again',
    content: buffered,
    sha: shaValue,
  });

  var config = {
    method: 'put',
    url: GITHUBURL,
    headers: {
      Authorization: 'Bearer ' + API_KEY,
      'Content-Type': 'application/json',
    },
    data: jsondata,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return JSON.stringify(response.data);
    })
    .catch(function (error) {
      if (error.response.status === 409) {
        console.log('409 error!!!!!!!!');
        updateRepo(data);
      } else {
        console.log('error', error);
      }
    });
}

loadData();

// create new hash
//  const buffer = crypto.randomBytes(16);

//  const latest = {
//    integrity: buffer.toString('hex'),
//    data: [...oldData, ...diff]
//  }
