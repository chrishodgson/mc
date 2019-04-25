export default [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true
  },
  {
    name: "hours",
    label: "Hours",
    type: "number",
    required: false
  },
  {
    name: "minutes",
    label: "Minutes",
    type: "number",
    required: false
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    required: false,
    showTime: false
  }
];
