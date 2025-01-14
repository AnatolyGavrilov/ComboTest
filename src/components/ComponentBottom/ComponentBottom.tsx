import React, { useState, useEffect } from "react";
import { Combobox } from "@consta/uikit/Combobox";
import { presetGpnDefault, Theme } from "@consta/uikit/Theme";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchCompanies, fetchUsers } from "../../sevices";
import styles from "./styles.module.scss";

interface ComboboxItem {
  label: string;
  id: string;
}

const UserCombobox: React.FC = () => {
  const [companyItems, setCompanyItems] = useState<ComboboxItem[]>([]);
  const [userItems, setUserItems] = useState<ComboboxItem[]>([]);
  const [company, setCompany] = useState<ComboboxItem | null>(null);
  const [user, setUser] = useState<ComboboxItem | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage] = useState<number>(1);
  const [loadingCompanies, setLoadingCompanies] = useState<boolean>(false);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [lastSearch, setLastSearch] = useState<string>("");

  useEffect(() => {
    const fetchInitialCompanies = async () => {
      setLoadingCompanies(true);
      const companies = await fetchCompanies<ComboboxItem[]>(currentPage, "");
      setCompanyItems(companies);
      setLoadingCompanies(false);
    };
    fetchInitialCompanies();
  }, [currentPage]);

  useDebounce(searchValue, 300, async (debouncedValue) => {
    if (debouncedValue !== lastSearch) {
      setLoadingCompanies(true);
      const companies = await fetchCompanies<ComboboxItem[]>(
        currentPage,
        debouncedValue
      );
      setCompanyItems(companies);
      setLoadingCompanies(false);
      setLastSearch(debouncedValue);
    }
  });

  useEffect(() => {
    const fetchUsersData = async () => {
      if (company) {
        setLoadingUsers(true);
        const users = await fetchUsers(company.id, searchValue);
        setUserItems(users);
        setLoadingUsers(false);
      }
    };

    fetchUsersData();
  }, [company, searchValue]);

  return (
    <Theme preset={presetGpnDefault}>
      <Combobox
        items={companyItems}
        placeholder="Выберите предприятие"
        value={company}
        size="s"
        onChange={setCompany}
        onSearchValueChange={setSearchValue}
        isLoading={loadingCompanies}
        labelForNotFound="Не найдено"
        labelForEmptyItems="Список пуст"
        className={styles.searchField}
      />
      <Combobox
        items={userItems}
        placeholder="Выберите пользователя"
        value={user}
        size="s"
        onChange={setUser}
        onSearchValueChange={setSearchValue}
        isLoading={loadingUsers}
        labelForNotFound="Не найдено"
        labelForEmptyItems="Список пуст"
        className={styles.searchField}
        disabled={!company} // Деактивируем, если не выбрана компания
      />
    </Theme>
  );
};

export default UserCombobox;
