import axios from "axios";

export const fetchCompanies = async <T>(
  page: number,
  searchTerm: string
): Promise<T> => {
  const response = await axios.get(
    `http://localhost:5000/api/companies?page=${page}&search=${searchTerm}`
  );
  return response.data.results; // В API мы уже возвращаем формат ComboboxItem
};

export const fetchUsers = async (company: string, searchTerm: string) => {
  const response = await axios.get(
    `http://localhost:5000/api/users?user=${company}&search=${searchTerm}`
  );
  console.log("response", response);
  return response.data.results;
};