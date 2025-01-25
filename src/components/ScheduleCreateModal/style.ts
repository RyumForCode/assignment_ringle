const schedule_modal_style_object = {
  modal_wrapper_style:
    "fixed top-[0px] left-[0px] " +
    "w-[452px] h-fit rounded-[28px] bg-[var(--color-modalBG)] " +
    "z-[2] drop-shadow-lg ",
  top_bar_style: "relative w-[100%] h-[42px] ",
  close_button_style:
    "absolute top-[10px] right-[14px] " +
    "w-[28px] h-[28px] p-[4px] rounded-full " +
    "cursor-pointer hover:bg-[var(--color-hoverGray)] transition-[50ms] ",
  title_section_style:
    "m-[25px_16px_17px_68px] " + "border-b-[1px] border-[#c4c7c5] ",
  title_input_style:
    "w-[368px] h-[44px] " +
    "text-[22px] " +
    "border-b-[3px] border-transparent " +
    "focus:outline-none focus:border-[var(--color-key)] transition-[50ms] ",
  select_type_section_style: "w-[calc(100%-84px)] mx-[68px_16px] ",
  select_type_button_style:
    "px-[8px] h-[36px] bg-[var(--color-sub)] rounded-[8px] " +
    "text-[14px] " +
    "cursor-pointer hover:bg-[var(--color-hoverSub)] transition-[50ms] ",
  date_range_section_style:
    "w-[calc(100%-32px)] h-[40px] m-[16px_16px_0_16px] " +
    "flex flex-row justify-start items-center gap-[8px] ",
  date_range_icon_style: "px-[8px_16px] ",
  date_range_input_wrapper_style: "relative h-[100%] ",
  date_range_input_style:
    "h-[100%] px-[16px] bg-[#dde3ea] rounded-[4px] " +
    "text-[14px] " +
    "hover:bg-[#ced3da] " +
    "border-b-[3px] border-transparent " +
    "focus:outline-none focus:border-[var(--color-key)] transition-[50ms] ",
  decision_section_style:
    "w-full h-[48px] p-[2px_16px_2px_16px] my-[20px_10px] " +
    "flex flex-row justify-end items-center gap-[8px] ",
  option_button_style:
    "w-[97.6px] h-[40px] rounded-full bg-[transparent] " +
    "text-[var(--color-key)] text-[14px] " +
    "cursor-pointer hover:bg-[#dee8f6] transition-[50ms] ",
  save_button_style:
    "w-[76px] h-[40px] rounded-full bg-[var(--color-key)] " +
    "text-[var(--color-white)] text-[14px] " +
    "cursor-pointer hover:bg-[#1e64d4] hover:drop-shadow-md transition-[50ms] ",
};

export default schedule_modal_style_object;
