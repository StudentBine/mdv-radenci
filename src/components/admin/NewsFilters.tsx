'use client'

interface NewsFiltersProps {
  searchTerm: string
  statusFilter: string
}

export default function NewsFilters({ searchTerm, statusFilter }: NewsFiltersProps) {
  return (
    <form method="get" className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          name="search"
          placeholder="Išči po naslovu ali avtorju..."
          defaultValue={searchTerm}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200"
        />
      </div>
      <select 
        name="status"
        defaultValue={statusFilter}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-colors duration-200"
        onChange={(e) => e.target.form?.requestSubmit()}
      >
        <option value="">Vsi statusi</option>
        <option value="published">Objavljeno</option>
        <option value="draft">Osnutek</option>
      </select>
    </form>
  )
}
