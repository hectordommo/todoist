import { useState, useEffect } from "react";
import "react-cmdk/dist/cmdk.css";
import CommandPalette, { JsonStructure, getItemIndex } from "react-cmdk";
import { useHotkeys } from "react-hotkeys-hook"
import Fuse from 'fuse.js'

function filterItems (
  items: JsonStructure,
  search: string,
  options?: { filterOnListHeading: boolean }
):JsonStructure {

    const searchQuery = search

    if (searchQuery.trim()) {
      const fuse = new Fuse(items.flatMap(section => section.items), {
        keys: ['children'],
        includeScore: true,
      });

      const result = fuse.search(searchQuery).map(({ item }) => item);

      const filteredOptions = items.map(section => ({
        ...section,
        items: section.items.filter(item => result.some(res => res.id === item.id))
      })).filter(section => section.items.length > 0);

      return filteredOptions;
    } else {
      return items;
    }
}

const Cmdk = () => {
  const [page, setPage] = useState<"root" | "projects">("root");
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  useHotkeys(['meta + k', 'alt + k'], () => setOpen(true))

  const filteredItems = filterItems(
    [
      {
        heading: "Admin",
        id: "admin",
        items: [
          {
            id: "client",
            children: "Crear nuevo cliente",
            icon: "HomeIcon",
            onClick: () => dispatchEvent( new Event('client:modal:open'))
          },
          {
            id: "settings",
            children: "Settings",
            icon: "CogIcon",
            href: "#",
          },
          {
            id: "projects",
            children: "Projects",
            icon: "RectangleStackIcon",
            closeOnSelect: false,
            onClick: () => {
              setPage("projects");
            },
          },
        ],
      },
      {
        heading: "Other",
        id: "advanced",
        items: [
          {
            id: "developer-settings",
            children: "Developer settings",
            icon: "CodeBracketIcon",
            href: "#",
          },
          {
            id: "privacy-policy",
            children: "Privacy policy",
            icon: "LifebuoyIcon",
            href: "#",
          },
          {
            id: "log-out",
            children: "Log out",
            icon: "ArrowRightOnRectangleIcon",
            onClick: () => {
              alert("Logging out...");
            },
          },
        ],
      },
    ],
    search
  );

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

      <CommandPalette.Page id="projects">
        {/* Projects page */}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default Cmdk;
