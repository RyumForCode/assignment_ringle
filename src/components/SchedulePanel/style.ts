const schedule_panel_style_object = {
  schedule_panel_wrapper_style:
    "w-full h-[calc(100%-16px)] mb-[16px] bg-[var(--color-white)] rounded-[28px] ",
  header_container_style:
    "w-full h-[84px] " + "flex flex-row justify-center items-center ",
  header_spacer_style:
    "w-[62.19px] h-full pr-[4px] pb-[4px] shrink-0 " +
    "flex justify-end items-end " +
    "font-[Google_Sans] font-[500] text-[11px] text-[var(--color-textGray)] ",
  header_spacer_gap_style:
    "w-[9px] h-full shrink-0 " + "border-b-[1px] border-[#dde3ea] ",
  header_day_container_style:
    "w-[100%] h-full pr-[16px] " + "flex flex-row justify-center items-center ",
  header_day_block_style:
    "w-[calc(100%/7)] h-full " + "border-b-[1px] border-[#dde3ea] ",
  header_day_index_style:
    "h-[28px] mt-[2px] " +
    "font-500 text-[11px] text-[var(--color-textGray)] leading-[32px] text-center ",
  header_date_display_style:
    "font-[Google_Sans] text-[25px] text-[var(--color-textGray)] text-center ",
  header_date_button_style:
    "w-[46px] h-[46px] rounded-full " + "cursor-pointer transition-[200ms] ",
  other_date_style: "bg-transparent hover:bg-[var(--color-hoverGray)] ",
  current_date_style: "bg-[var(--color-key)] text-[var(--color-white)] ",
  body_container_style:
    "w-full h-[calc(100%-84px)] " +
    "flex flex-row justify-between items-start " +
    "overflow-y-scroll ",
  body_time_table_style: "w-[64.19px] shrink-0 ",
  body_time_table_box_style:
    "relative h-[48px] " +
    "font-[Google_Sans] font-[500] text-[11px] text-[var(--color-textGray)] ",
  body_time_table_title_style: "absolute bottom-[-8px] right-[8px] ",
  body_week_array_container_style:
    "relative w-[100%] h-[100%] " +
    "flex flex-row justify-between items-start ",
  body_week_array_spacer_style: "w-[9px] h-[100%] ",
  table_row_container_style:
    "absolute top-0 left-0 w-[100%] h-[1152px] " +
    "flex flex-col justify-evenly items-center ",
  table_row_style: "w-[100%] h-[1px] bg-[#dde3ea] ",
};

export default schedule_panel_style_object;
