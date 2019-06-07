export default [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Your name",
    className: "col"
  },
  {
    name: "challenge",
    label: "Challenge",
    type: "select",
    required: true
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "date",
    required: true,
    showTime: false,
    placeholder: "Enter a date",
    className: "col"
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: false
  }
];