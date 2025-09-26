import { Filter, Search } from "lucide-react";
import { memo } from "react";

export const FilterForm = memo(({ filters, handleFilterChange, clearFilters, uniqueCategories, uniqueBrands }) => (
  <div className="bg-bgPrimary rounded-lg shadow-skin border border-border p-6 space-y-6">
    <h2 className="text-xl font-semibold text-textPrimary flex items-center gap-2">
      <Filter className="w-5 h-5" /> Filters
    </h2>
    <div>
      <label className="block text-sm font-medium text-textSecondary mb-2">Search Products</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-accent w-4 h-4" />
        <input
          type="text"
          placeholder="Search by name or description..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-textPrimary bg-bgPrimary"
        />
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-textSecondary mb-2">Sort By</label>
      <select
        value={filters.sortBy}
        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
        className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-textPrimary bg-bgPrimary"
      >
        <option value="name">Name (A-Z)</option>
        <option value="price-low">Price (Low to High)</option>
        <option value="price-high">Price (High to Low)</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-textSecondary mb-2">Price Range</label>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          placeholder="Min"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          className="p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-textPrimary bg-bgPrimary"
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          className="p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-textPrimary bg-bgPrimary"
        />
      </div>
    </div>
    {uniqueCategories.length > 0 && (
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-textPrimary bg-bgPrimary"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
    )}
    {uniqueBrands.length > 0 && (
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-2">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => handleFilterChange("brand", e.target.value)}
          className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-textPrimary bg-bgPrimary"
        >
          <option value="">All Brands</option>
          {uniqueBrands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
    )}
    <button
      onClick={clearFilters}
      className="w-full py-2 px-4 bg-primary text-textPrimary rounded-lg hover:opacity-90 transition-opacity"
    >
      Clear All Filters
    </button>
  </div>
))