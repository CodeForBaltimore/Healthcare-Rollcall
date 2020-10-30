import { createLocalVue, mount } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import Questionnaire from "../src/components/Questionnaire";

const createQuestion = (type, responses) => {
  return {
    index: 0,
    required: true,
    questionText: "Test Text",
    responseType: type,
    validResponses: responses ? responses : ["Poor", "Not Great", "Fantastic"],
    allowOther: false,
  };
};

describe("Questionnaire has data", () => {
  it("has data", () => {
    expect(typeof Questionnaire.data).toBe("function");
  });
});

describe("Questionnaire renders questions correctly", () => {
  const localVue = createLocalVue();
  localVue.use(BootstrapVue);
  it("shows radios for correct type", () => {
    const componentWrapper = mount(Questionnaire, {
      localVue,
      propsData: {
        questionnaires: [
          {
            questions: [createQuestion("single-select")],
          },
        ],
      },
      data() {
        return {};
      },
    });
    const checkboxArray = componentWrapper.findAll(".custom-radio");
    const poorRadioHtml = checkboxArray
      .at(0)
      .find(".custom-control-label")
      .text();
    const notGreatRadioHtml = checkboxArray
      .at(1)
      .find(".custom-control-label")
      .text();
    const fantasticRadioHtml = checkboxArray
      .at(2)
      .find(".custom-control-label")
      .text();
    expect(checkboxArray.length).toEqual(3);
    expect(poorRadioHtml).toEqual("Poor");
    expect(notGreatRadioHtml).toEqual("Not Great");
    expect(fantasticRadioHtml).toEqual("Fantastic");
  });

  it("shows checkbox for correct type", () => {
    const componentWrapper = mount(Questionnaire, {
      localVue,
      propsData: {
        questionnaires: [
          {
            questions: [createQuestion("multi-select")],
          },
        ],
      },
      data() {
        return {};
      },
    });
    const checkboxArray = componentWrapper.findAll(".custom-checkbox");
    const poorCheckboxHtml = checkboxArray
      .at(0)
      .find(".custom-control-label")
      .text();
    const notGreatCheckboxHtml = checkboxArray
      .at(1)
      .find(".custom-control-label")
      .text();
    const fantasticCheckboxHtml = checkboxArray
      .at(2)
      .find(".custom-control-label")
      .text();
    expect(checkboxArray.length).toEqual(3);
    expect(poorCheckboxHtml).toEqual("Poor");
    expect(notGreatCheckboxHtml).toEqual("Not Great");
    expect(fantasticCheckboxHtml).toEqual("Fantastic");
  });

  it("shows short text input correctly", () => {
    const componentWrapper = mount(Questionnaire, {
      localVue,
      propsData: {
        questionnaires: [
          {
            questions: [createQuestion("short-text")],
          },
        ],
      },
      data() {
        return {};
      },
    });

    const shortTextElement = componentWrapper.find("input[type='text']").html();
    expect(shortTextElement).toBeTruthy();
  });

  it("shows long text input correctly", () => {
    const componentWrapper = mount(Questionnaire, {
      localVue,
      propsData: {
        questionnaires: [
          {
            questions: [createQuestion("long-text")],
          },
        ],
      },
      data() {
        return {};
      },
    });

    const longTextElement = componentWrapper.find("textarea").html();
    expect(longTextElement).toBeTruthy();
  });
});
