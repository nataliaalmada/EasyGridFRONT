import { Box } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

export default function CustomDatepicker({
  isClearable = false,
  onClear = () => {},
  ...rest
}) {
  return (
    <Box className="datepicker">
      <Controller {...rest} />
      {isClearable && (
        <button type="button" onClick={onClear}>
          x
        </button>
      )}

      <style>{`
        ::-webkit-calendar-picker-indicator {
          background: url("data:image/svg+xml, %3Csvg%20version%3D%221.1%22%20id%3D%22Capa_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%2029.237%2029.237%22%20style%3D%22enable-background%3Anew%200%200%2029.237%2029.237%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cg%3E%0A%09%3Cg%3E%0A%09%09%3Cpath%20style%3D%22fill%3A%23010002%3B%22%20d%3D%22M7.685%2C24.819H8.28v-2.131h3.688v2.131h0.596v-2.131h3.862v2.131h0.597v-2.131h4.109v2.131h0.595%0A%09%09%09v-2.131h3.417v-0.594h-3.417v-3.861h3.417v-0.596h-3.417v-3.519h3.417v-0.594h-3.417v-2.377h-0.595v2.377h-4.109v-2.377h-0.597%0A%09%09%09v2.377h-3.862v-2.377h-0.596v2.377H8.279v-2.377H7.685v2.377H3.747v0.594h3.938v3.519H3.747v0.596h3.938v3.861H3.747v0.594h3.938%0A%09%09%09V24.819z%20M12.563%2C22.094v-3.861h3.862v3.861H12.563z%20M21.132%2C22.094h-4.109v-3.861h4.109V22.094z%20M21.132%2C14.118v3.519h-4.109%0A%09%09%09v-3.519C17.023%2C14.119%2C21.132%2C14.119%2C21.132%2C14.118z%20M16.426%2C14.118v3.519h-3.862v-3.519%0A%09%09%09C12.564%2C14.119%2C16.426%2C14.119%2C16.426%2C14.118z%20M8.279%2C14.118h3.688v3.519H8.279V14.118z%20M8.279%2C18.233h3.688v3.861H8.279V18.233z%22%0A%09%09%09%2F%3E%0A%09%09%3Cpath%20style%3D%22fill%3A%23010002%3B%22%20d%3D%22M29.207%2C2.504l-4.129%2C0.004L24.475%2C2.51v2.448c0%2C0.653-0.534%2C1.187-1.188%2C1.187h-1.388%0A%09%09%09c-0.656%2C0-1.188-0.533-1.188-1.187V2.514l-1.583%2C0.002v2.442c0%2C0.653-0.535%2C1.187-1.191%2C1.187h-1.388%0A%09%09%09c-0.655%2C0-1.188-0.533-1.188-1.187V2.517l-1.682%2C0.004v2.438c0%2C0.653-0.534%2C1.187-1.189%2C1.187h-1.389%0A%09%09%09c-0.653%2C0-1.188-0.533-1.188-1.187V2.525H8.181v2.434c0%2C0.653-0.533%2C1.187-1.188%2C1.187H5.605c-0.656%2C0-1.189-0.533-1.189-1.187%0A%09%09%09V2.53L0%2C2.534v26.153h2.09h25.06l2.087-0.006L29.207%2C2.504z%20M27.15%2C26.606H2.09V9.897h25.06V26.606z%22%2F%3E%0A%09%09%3Cpath%20style%3D%22fill%3A%23010002%3B%22%20d%3D%22M5.605%2C5.303h1.388c0.163%2C0%2C0.296-0.133%2C0.296-0.297v-4.16c0-0.165-0.133-0.297-0.296-0.297H5.605%0A%09%09%09c-0.165%2C0-0.298%2C0.132-0.298%2C0.297v4.16C5.307%2C5.17%2C5.44%2C5.303%2C5.605%2C5.303z%22%2F%3E%0A%09%09%3Cpath%20style%3D%22fill%3A%23010002%3B%22%20d%3D%22M11.101%2C5.303h1.389c0.164%2C0%2C0.297-0.133%2C0.297-0.297v-4.16c-0.001-0.165-0.134-0.297-0.298-0.297%0A%09%09%09H11.1c-0.163%2C0-0.296%2C0.132-0.296%2C0.297v4.16C10.805%2C5.17%2C10.938%2C5.303%2C11.101%2C5.303z%22%2F%3E%0A%09%09%3Cpath%20style%3D%22fill%3A%23010002%3B%22%20d%3D%22M16.549%2C5.303h1.388c0.166%2C0%2C0.299-0.133%2C0.299-0.297v-4.16c-0.001-0.165-0.133-0.297-0.299-0.297%0A%09%09%09h-1.388c-0.164%2C0-0.297%2C0.132-0.297%2C0.297v4.16C16.252%2C5.17%2C16.385%2C5.303%2C16.549%2C5.303z%22%2F%3E%0A%09%09%3Cpath%20style%3D%22fill%3A%23010002%3B%22%20d%3D%22M21.899%2C5.303h1.388c0.164%2C0%2C0.296-0.133%2C0.296-0.297v-4.16c0-0.165-0.132-0.297-0.296-0.297%0A%09%09%09h-1.388c-0.164%2C0-0.297%2C0.132-0.297%2C0.297v4.16C21.603%2C5.17%2C21.735%2C5.303%2C21.899%2C5.303z%22%2F%3E%0A%09%3C%2Fg%3E%0A%3C%2Fg%3E%0A%0A%3C%2Fsvg%3E")
            no-repeat;
        }
        ::-webkit-calendar-picker-indicator:hover {
          cursor: pointer;
        }
        .datepicker {
          display: grid;
          position: relative;
          width: max-content;
        }

        input[type="date"] {
          position: relative;
          border: 1px solid;
          border-radius: 0.3rem;
          padding: 0.2rem 0.2rem 0.2rem 0.4rem;
          border-color: rgb(170, 170, 170);
        }

        input[type="date"] ~ button {
          margin-left: auto;
          position: absolute;
          right: 1.8rem;
          align-self: center;
          text-align: center;
          background: none;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          color: rgb(170, 170, 170);
        }

        input[type="date"] ~ button:hover {
          color: rgb(90, 90, 90);
        }

        .inputField {
          display: grid;
          position: relative;
          /* width: max-content; */
        }

        input[type="text"] {
          display: flex;
        }

        input[type="text"] ~ button {
          margin-left: auto;
          position: absolute;
          right: 0rem;
          align-self: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 0.5rem;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-flow: column;
          gap: 1rem;
        }

        form {
          display: grid;
          gap: 1rem;
        }
      `}</style>
    </Box>
  );
}
