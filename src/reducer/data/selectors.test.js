import NameSpace from "../name-spaces";
import {receiveCitiesListSelector, receiveCityInfoSelector, receiveCityOffersSelector} from "./selectors";


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
    })).toEqual({
      name: `Amsterdam`,
      location: []
    });
  });
});
