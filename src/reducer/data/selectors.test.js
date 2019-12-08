import NameSpace from "../name-spaces";
import {
  receiveCitiesListSelector,
  receiveCityInfoSelector,
  receiveCityOffersSelector,
  receiveOfferSelector
} from "./selectors";
import {offersData} from "../../mocks/offer-data";


const NAME_SPACE = NameSpace.DATA;

describe(`Selectors work correctly`, () => {
  it(`Selector for receiving offers returns correct value`, () => {
    expect(receiveCityOffersSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        offers: [
          {
            city: {
              name: `Amsterdam`,
              location: []
            }
          },
          {
            city: {
              name: `Amsterdam`,
              location: []
            }
          },
          {
            city: {
              name: `Paris`,
              location: []
            }
          }
        ]
      }
    })).toEqual([
      {
        city: {
          name: `Amsterdam`,
          location: []
        }
      },
      {
        city: {
          name: `Amsterdam`,
          location: []
        }
      }
    ]);
  });

  it(`Selector for receiving city coordinates returns correct value`, () => {
    expect(receiveCitiesListSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        offers: [
          {
            city: {
              name: `Amsterdam`,
              location: []
            }
          },
          {
            city: {
              name: `Amsterdam`,
              location: []
            }
          },
          {
            city: {
              name: `Paris`,
              location: []
            }
          }
        ]
      }
    })).toEqual([
      {
        name: `Amsterdam`,
        location: []
      },
      {
        name: `Paris`,
        location: []
      }
    ]);
  });

  it(`Selector for receiving list of cities returns correct value`, () => {
    expect(receiveCityInfoSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        offers: offersData
      }
    })).toEqual({
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      }
    });
  });
  it(`Selector for receiving offer by id works correctly`, () => {
    expect(receiveOfferSelector({
      [NAME_SPACE]: {
        city: `Amsterdam`,
        offers: offersData
      }
    }, 1)).toEqual(offersData[0]);
  });
});
