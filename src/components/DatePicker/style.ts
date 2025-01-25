const date_picker_style_object = {
  wrapper_style: "w-[256px] ",
  add_schedule_section_style: "h-[84px] ",
  add_schedule_button_style:
    "h-[54px] mt-[12px] p-[1px_12px_1px_16px] " +
    "absolute left-[16px] " +
    "flex flex-row justify-center items-center gap-[10px] " +
    "text-[14px] " +
    "bg-[var(--color-white)] rounded-[16px] " +
    "cursor-pointer hover:bg-[#ecf2fc] drop-shadow-sm hover:drop-shadow-lg transition-[50ms] ",
  calendar_section_style: "w-full h-full ",
  calendar_box_style: "p-[13px_22px_0_19px] ",
  calendar_header_style:
    "w-[208px] h-[32px] mx-[4px_3px] " +
    "flex flex-row justify-between items-center " +
    "font-[Google_Sans] font-500 text-[14px] ",
  current_month_style: "pl-[5px] " + "select-none ",
  navigation_arrow_button_style:
    "p-[4px] rounded-full " +
    "cursor-pointer hover:bg-[var(--color-hoverGray)] duration-[100ms] " +
    "active:bg-[var(--color-activeGray)] ",
  calendar_display_table_style: "w-full " + "font-[Google_Sans] text-[10px] ",
  table_header_day_style: "h-[28px] " + "font-[400] ",
  table_body_row_style: "py-[2px] px-[calc((100%/7-24px)/2)] box-content ",
  table_body_common_date_style:
    "h-[24px] w-[24px] rounded-full " +
    "font-[400] text-center " +
    "cursor-pointer duration-[100ms] ",
  table_body_none_date_style: "hover:bg-[var(--color-hoverGray)] ",
  table_body_current_date_style:
    "bg-[var(--color-sub)] hover:bg-[var(--color-hoverSub)] ",
  table_body_today_date_style:
    "bg-[var(--color-key)] text-[var(--color-white)] ",
};

export default date_picker_style_object;
