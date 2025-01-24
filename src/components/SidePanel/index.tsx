import side_panel_style_object from "./style";

export const SidePanel = () => {
  return (
    <aside className={side_panel_style_object.wrapper_style} id="sidebar">
      <button
        className={
          side_panel_style_object.app_button_style + "hover:bg-[#ebe5d0] "
        }
      >
        <img
          src="/icons/keep_icon.png"
          alt="keep app icon"
          width={20}
          height={20}
        />
      </button>
      <button
        className={
          side_panel_style_object.app_button_style + "hover:bg-[#d4deee] "
        }
      >
        <img
          src="/icons/tasks_icon.png"
          alt="tasks app icon"
          width={20}
          height={20}
        />
      </button>
      <button
        className={
          side_panel_style_object.app_button_style + "hover:bg-[#d4deee] "
        }
      >
        <img
          src="/icons/contacts_icon.png"
          alt="contacts app icon"
          width={20}
          height={20}
        />
      </button>
      <button
        className={
          side_panel_style_object.app_button_style + "hover:bg-[#d4deee] "
        }
      >
        <img
          src="/icons/maps_icon.png"
          alt="maps app icon"
          width={20}
          height={20}
        />
      </button>
      <div className={side_panel_style_object.app_divider_style} />
      <button className={side_panel_style_object.add_button_style}>
        <img src="/icons/add.svg" alt="add button icon" />
      </button>
      <button className={side_panel_style_object.fold_button_style}>
        <img src="/icons/chevron_right_20dp.svg" alt="chevron right icon" />
      </button>
    </aside>
  );
};
