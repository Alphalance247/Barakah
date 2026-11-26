"use client";

import { useState } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/layout/BottomNav";
import { MaterialIcon } from "@/components/common/MaterialIcon";

interface CollectionCarouselCard {
  id: string;
  filterCategory: "collections" | "reminders" | "series" | "duas";
  title: string;
  clipsCount: number;
  topBadgeIcon: string;
  topBadgeFilled?: boolean;
  bottomText: string;
  bottomIcon?: string;
  bottomColorClass: string;
  thumbnails: string[];
}

const INITIAL_COLLECTIONS: CollectionCarouselCard[] = [
  {
    id: "col-jannah",
    filterCategory: "reminders",
    title: "Jannah Reminders",
    clipsCount: 14,
    topBadgeIcon: "notifications",
    topBadgeFilled: true,
    bottomText: "Daily 8:00 PM",
    bottomIcon: "alarm",
    bottomColorClass: "text-secondary font-medium",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwTulnvrJi4D1BSlUNTUVZlPvnYzzy1sf80SqDMEdvJrPSluEATN-h0-Z6Q77L5-HYhFam8cRjg08g81yU5iRvJp4isQxWkT7khkZDcKg1JTnMFryJu_MWUJTzxk1730cKvBdfmIxSDEwfRsNBGDNiGqcGh436IxJwRYDZX5DBJ1zFl9xDYAHDJpRKcq_080wLnNE7r8sem0GE0txTcS6C3S1FIGtYbnPaWlN-zR4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLvCl1QATpcpsLkEITcIkMM1-L7iN1X4YQuDaGKXF3xANEM6W3cyYF5HSp2kjBEZeWP8pb305lS1FckVjK2gtlezUz7cdq_hjQqv9XL7Ze1Dempxco1fT0MP0PzVrXFMc6LWvpJ0Iaw4kD0TCFKoZ6GocD0pgciRjy2HRjdM4V8XD5kiHxtF_c6GoPwFaFEToyFwlVeEGBkpRPEIMkfEpTPPwYogZ6wWPxQsgC3Y",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5TEYxkjG1FyVon2-tuKTo4VHT3QVsJ7QL8yVAUD5nmI4wkYnlzYqQviJhWp7u9pCQNCEMP16PuiCu_AFfR3s6RGJYs-_Wz1z0yLV6A8pG-FbWU4BbS_mk9yexRxM79H5iTnkTfMlK85wZQgx5b6IXMigb0v-vzWsjxyLeFyyfMFd14YCyTrbC0zZfy1GHDrt3h-fCtuLY5oEnNLM23SZvTUoyP_eMZNjNxeLFpbI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnKoLm_pHLG7pgtPBptOyBfERghqINUimBdINXiPbAVaC-b4e_etrO5JKgHWJ0TS1T_9J1H5muCbQByz2q8CHnO-XUd-LVvWz3KLSWY8lofukJgMoDAzzEle8y4s39NQLe6DpAiRjbeTDxomsqK6WZgtnFPjwY8At2XdYqPQn6JeBXmQlUmatRlC8-QGj7sOmw9QWWHtdO0p3JgdmWn5mqDxlNO5DYCNzGyF59KWI",
    ],
  },
  {
    id: "col-quran",
    filterCategory: "reminders",
    title: "Quran Reflections",
    clipsCount: 22,
    topBadgeIcon: "alarm",
    bottomText: "Updated 2d ago",
    bottomColorClass: "text-on-surface-variant",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQoCSD35awrAMDhxCwyURgcbijtXzFe_cLDMUN94vFwF3f2u_RMTyLYLjbacbVTT_r6RXg6mD0qLfoCHlRLDhSRz_pMI-KySriK0b2FzWM6ZptYZDUfmIW1bMnX1GifwQDXW9ABo-Dsd42fopOR9acECROItWFe1jM5QvHprDvcwbZ5Og6dX1hQo2nB9hm3oqqwuHBKsoHFB86uGVQjcWWJo8KQjlD2NjO5ocdhZk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCG5ALxJSUySZDTUfBti4ZGmGeuGYJGF5fvkxzO_TLhdJ4mQn7WnUzM1uXUUoIandCjxUXAaLuTEq-j5Tx1VS930KgusKhuo955cSzxUYFlBxKs_Hh6kevRfDHF4P_RKbJzK7IyRUFhOsbZ3bZjPSeknssx7kwwLa8RFqUfNTQUsp4iZPwjZoLUA_lah1nlKw_HG1LZNvAgC_lawcy7qkxPTp9-MNndl_oU8UQqM3g",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWPQbOf5LZdVw8S9iAIQc6DP03GyagjcN_QzZWRY2GlfA9lKNYB7FYoyKLHUx8x1LwNyRdHdDcKZnBi5yyyE3P3soVJMW1xA8oAV8dpoM3sRl3D9sER_b5UGnohl0NgB6R7saKF94jNUBCR785FxYmj_MD7ih9dbTgsOfPd03jMP9LhtBQgFi-V8_Xj9VU76bB6FRUlbPU4XExqcATTzfeKq0rMCuNkvaRO4_RLM4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA89APyieoh6WR3f8eE7CaOm3Kuyw7ahcrQc78eo_HR25FoL3_DmQ2LLnLiE1TjFv2knxqgIkgR-4OSZy2SkD_kx56cU4dNOX5pRqIwyXCGCfP2WzOSPRlNX7WaTXw3esuBliqCqWI6m2y6I5zRbIGkoSb-ldxGfnE2zEqidgqS7ZWJEW_FdWcraUhvvGeCrGZxRvFZpgH2qIhueTaIOPnrwkmLdBq_Bddgw7CKJ0E",
    ],
  },
  {
    id: "col-duas",
    filterCategory: "duas",
    title: "Duas for Peace",
    clipsCount: 9,
    topBadgeIcon: "favorite",
    topBadgeFilled: true,
    bottomText: "Spiritual Healing",
    bottomColorClass: "text-tertiary font-medium",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzRVhQnATrQNNYSAUS7oSQbvIMN2yOgwNNXbVjD5dSDk3M7yXppyKU1Og_JkSxnGQxshBsW3aWtt7Si9nTL3qi8XMHS4ICjF6pbXo9m-7ST50PPwljIU2uBm2fA1657coIZRBZcH2HtK5thnfRkhFML7C0-s2_rx9RPxmlVVBz0lbuHSGnSuiiQ9qkqwF_GJ2CVuuNqnZWiqoMSxP3LzkGpCiLY9XuSmLVoGVvnZM",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCioqZWibODl5gOWwVdog_hkPqLoMnfQl0gtHhmrZRm5eKvW9uLXIQo4xudpXcRIu6apuytIEEp0Q9NGmWi43p0JCKpqFs5m9lbMCmo6EsEPNIkhb9PnaCJFvmUpWB4cCwPD1KPuuluTrYmDwMwjonWwQTC445qC2xUBDfUqGtYWlh-3YkOOuW9Xb-kF1VqcRSygDLHUatIKHyuFyA3u_5Xj1c9FpWQ6SNqcFGah3U",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_cLNjsVy2usMeE6IAqMB0m3lnkoxVjRFmCP9ju2gIvhMo1a4FThufqsAEZiSVrNMXsfBk0L3Ps1vmciDCgs6IyinlBhtycWcnOlxXzo8fp2gBJy_zfO0XOptnLIbo1m-kxcDJbJ_4sSiPNGuSwAaE33oeIoe7nBJ-QxjNwlzD4zFAKKyweqy4vV4dimIBBnrHwm4MJyF6-outw2jDkrKekwa6PnD2hVqVjyVIEmg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDQU0YfuHMJXjaVZXsOZFvwC3Gl72j7QSmS6SAAdnaveLhFCXco-S7kOc5wJ5_YCilHUiQM8A3U-u6chfRaqD7gI7LLeibrPZt6aKAcRWK1XUfmp7pn9gSeH5Ou0qxQ2aMhEiswAoFUTyquYSrJPWINleV_4dbZVFFmt8gvixYmHNonyE20qMg8Dl_Wgofc_PQqGoxK-HzmplYcCSwS728bZGd7ok6PBXE89oAY",
    ],
  },
  {
    id: "col-parenting",
    filterCategory: "series",
    title: "Parenting & Character",
    clipsCount: 16,
    topBadgeIcon: "alarm",
    bottomText: "Tarbiyah series",
    bottomColorClass: "text-on-surface-variant",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrqGubWELq1s6DXqyLRVRt0hOigUeXG60u3rAqE_DboLbJPYtS2oEovbJRbGWNzzHGAIq4sNSYRJ_vGmkG9ubrTyyo6fghgo6VB7TYkuGlv95ZzwsKmGiB1-BKUkz8WV-bMyYWrHeFA_gT4UVLntjWhzoRTFOvT1Bancwm0cgdDBWyVU8HQQftMINJtul9MQj-7KSZ1YamEvKFA393hq6Qn5jkO-qP6XWoyMAirf0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7_i1yTi46F3-wqEq9bZTR2ubV4wc6twC37NA4N_ob5gFArhRvxedHoJ56L59ruXvZXmR3Ql0IWsGLXhHY-3inRUKVj9JTxZ_bzs7GutalD4HiEwV7yWoTBiMM8dbkfZojSci3IgBgc-NIfe2hVPO4ReuUI1ui7yHMWScqnNNw5rCR8eK93qLdtLikshw3bwP6q1qZ5gMxWYTRb8kXke0bJZewyk5qGRX6VDfvfWI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCalmxGzHbJvjgQjk-jrhsZDp6IU9ZnOCDA7MSNWBzmSvQaOpoRhmwfIdNE3nU1hRcBlOV0SAxbRPzrEh4vtXUcONgESu7VL6rDnCmzhZaCkKf-OA9SwnxFZczvG0lvfm3-FIWg7Tzd9Xf03nDNaQQYye909rMpU2slm57RqePp1jYInz1PsxKi8Nrdz3qxwkTU6VRPtHa0SRYwdCqf2b9gK6IIru7ksBZX2ywzdTw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKea6oQcczHYA4UqF7k18MP3blAXwiZM9cyX9ifqmImFnXr38D7TnS8wAnIIG9jLbyNbRxSt6-Y3xaj3DWw6WzwbTlBgb95xuBtSs6Rplb6Hc0jQqmGjdOMfFR76YF9yZN31yg8QNuVunJwFnP7eY4b4XMd_hZJDpKH7tip10rhAxX7y-E3erS8D05McfyVSbiOPvdCb5D_PCHcXiHPEfny_AqwxU_ovCfBeWXbyI",
    ],
  },
];

interface SavedReelGridItem {
  id: string;
  filterCategory: "all" | "duas" | "series";
  title: string;
  topRightIcon: "play_circle" | "movie";
  metaIcon: "visibility" | "schedule";
  metaLabel: string;
  imageUrl: string;
  alt: string;
}

const SAVED_REELS_GRID: SavedReelGridItem[] = [
  {
    id: "sr-1",
    filterCategory: "series",
    title: "Repentance & Hope",
    topRightIcon: "play_circle",
    metaIcon: "visibility",
    metaLabel: "48.2k",
    alt: "Ustadh Nouman lecture clip",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGO-4bMHdlcDSLalYAQRZt2iBC1f8nOx7qBmu7-5V6_WZxHz5ipDydVYU7RJ4ZdIe2MrM164JcrjsIUaK5cbsMScl57_TfwJEdx-FyQX3ZyFVCwIds6nheUfrjjPtbAX_4ZtP0pFqId9nf0IGJ9w7d5ASb6yMKGv77BZDO7R-nJHl1iG1pWDhGic9swuD2ckRfLhI7643GWTnvIaIYBdda9gF_bUdzuxXvix2sliY",
  },
  {
    id: "sr-2",
    filterCategory: "duas",
    title: "Morning Adhkar",
    topRightIcon: "play_circle",
    metaIcon: "visibility",
    metaLabel: "112k",
    alt: "Morning Adhkar clip",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqn6h_K3qROBoeRXm_AVBkpfrxVqML0FKtZg283sKIi0uLnX0XInqX5odY0nVBYoxKrucyJDeu_BMmOI1vC8kdekIsyYDiaHGXZJddjEM-qhBblk-HVk-htRhqm2hU9R4qy_AOpYc-laTuqb6pJ42o_07P2mUd-qLvxoF2eGGwZuTtPi1g5XNpA0dayzpmbAS4Z9A-AyHxy-oUAjxEkyo57Pyir2f80Cvpve4PAns",
  },
  {
    id: "sr-3",
    filterCategory: "series",
    title: "Wake Up for Fajr",
    topRightIcon: "movie",
    metaIcon: "schedule",
    metaLabel: "01:30",
    alt: "Sunrise over minarets",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwTulnvrJi4D1BSlUNTUVZlPvnYzzy1sf80SqDMEdvJrPSluEATN-h0-Z6Q77L5-HYhFam8cRjg08g81yU5iRvJp4isQxWkT7khkZDcKg1JTnMFryJu_MWUJTzxk1730cKvBdfmIxSDEwfRsNBGDNiGqcGh436IxJwRYDZX5DBJ1zFl9xDYAHDJpRKcq_080wLnNE7r8sem0GE0txTcS6C3S1FIGtYbnPaWlN-zR4",
  },
  {
    id: "sr-4",
    filterCategory: "series",
    title: "Surah Al-Kahf Gems",
    topRightIcon: "play_circle",
    metaIcon: "visibility",
    metaLabel: "94k",
    alt: "Ustadh gesturing in lecture",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCG5ALxJSUySZDTUfBti4ZGmGeuGYJGF5fvkxzO_TLhdJ4mQn7WnUzM1uXUUoIandCjxUXAaLuTEq-j5Tx1VS930KgusKhuo955cSzxUYFlBxKs_Hh6kevRfDHF4P_RKbJzK7IyRUFhOsbZ3bZjPSeknssx7kwwLa8RFqUfNTQUsp4iZPwjZoLUA_lah1nlKw_HG1LZNvAgC_lawcy7qkxPTp9-MNndl_oU8UQqM3g",
  },
  {
    id: "sr-5",
    filterCategory: "duas",
    title: "Dua for Restlessness",
    topRightIcon: "movie",
    metaIcon: "schedule",
    metaLabel: "01:15",
    alt: "Supplication with open palms",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCioqZWibODl5gOWwVdog_hkPqLoMnfQl0gtHhmrZRm5eKvW9uLXIQo4xudpXcRIu6apuytIEEp0Q9NGmWi43p0JCKpqFs5m9lbMCmo6EsEPNIkhb9PnaCJFvmUpWB4cCwPD1KPuuluTrYmDwMwjonWwQTC445qC2xUBDfUqGtYWlh-3YkOOuW9Xb-kF1VqcRSygDLHUatIKHyuFyA3u_5Xj1c9FpWQ6SNqcFGah3U",
  },
  {
    id: "sr-6",
    filterCategory: "series",
    title: "Patience in Hardship",
    topRightIcon: "play_circle",
    metaIcon: "visibility",
    metaLabel: "35k",
    alt: "Ancient architectural arch",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKea6oQcczHYA4UqF7k18MP3blAXwiZM9cyX9ifqmImFnXr38D7TnS8wAnIIG9jLbyNbRxSt6-Y3xaj3DWw6WzwbTlBgb95xuBtSs6Rplb6Hc0jQqmGjdOMfFR76YF9yZN31yg8QNuVunJwFnP7eY4b4XMd_hZJDpKH7tip10rhAxX7y-E3erS8D05McfyVSbiOPvdCb5D_PCHcXiHPEfny_AqwxU_ovCfBeWXbyI",
  },
];

export function SavedView() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "collections" | "reminders" | "series" | "duas"
  >("all");
  const [collections, setCollections] =
    useState<CollectionCarouselCard[]>(INITIAL_COLLECTIONS);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCollectionName.trim();
    if (!trimmed) return;
    const created: CollectionCarouselCard = {
      id: `col-${Date.now()}`,
      filterCategory: "collections",
      title: trimmed,
      clipsCount: 1,
      topBadgeIcon: "alarm",
      bottomText: "Just now",
      bottomColorClass: "text-on-surface-variant",
      thumbnails: INITIAL_COLLECTIONS[0].thumbnails,
    };
    setCollections((prev) => [created, ...prev]);
    setNewCollectionName("");
    setShowNewModal(false);
  };

  const filteredCollections = collections.filter((col) => {
    const matchesSearch = col.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (
      activeFilter === "all" ||
      activeFilter === "collections"
    ) {
      return matchesSearch;
    }
    return col.filterCategory === activeFilter && matchesSearch;
  });

  const filteredReels = SAVED_REELS_GRID.filter((reel) => {
    const matchesSearch = reel.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (activeFilter === "duas") {
      return reel.filterCategory === "duas" && matchesSearch;
    }
    if (activeFilter === "series") {
      return reel.filterCategory === "series" && matchesSearch;
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Custom Top Header with Search, Add Collection, and Profile Avatar per Stitch */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(15,30,27,0.03)]">
        <div className="h-16 px-4 max-w-120 mx-auto flex items-center justify-between">
          <Link href="/feed" className="flex items-center gap-2">
            <img
              alt="Barakah App Logo"
              className="h-8 w-8 rounded-lg object-contain"
              src="/images/barakah-logo.png"
            />
            <span className="text-lg leading-6 text-primary-dark font-bold tracking-tight">
              Barakah
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSearchBar((prev) => !prev)}
              aria-label="Search saved items"
              className="w-9 h-9 rounded-full bg-surface-container-low text-primary-dark flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer"
            >
              <MaterialIcon name="search" className="text-xl" />
            </button>
            <button
              type="button"
              onClick={() => setShowNewModal((prev) => !prev)}
              aria-label="Create collection"
              className="w-9 h-9 rounded-full bg-surface-container-low text-primary-dark flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer"
            >
              <MaterialIcon name="add" className="text-[21px]" />
            </button>
            <Link
              className="flex items-center justify-center p-0.5 rounded-full hover:opacity-90 transition-opacity ml-1"
              href="/profile"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTjBYUNCtw6WFjawNCFE3YA3Vc-TqmysjuMM4ewsZVd_5ERBfPb4_8KGyeo4X_oeGpuIUGfjkJeqdNy6y5txGanG6eTcLYmK3EUzGEo_pWOuw9-sEJeUDzs1hC6JxA6g171cBYo8YCU88GkA41M4LkkeF3xVXGCwBW6q6eHQqogo8qtKy9fXVW0pkWkZ2BRprBgQungDCiaIgpP4VLOYdsGmC3V9GcmUV5dKDNmGI"
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full max-w-120 mx-auto pt-16 pb-28 bg-surface">
        <div className="flex flex-col w-full">
          {/* Title and Item Count */}
          <div className="px-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl leading-8 font-bold text-primary-dark tracking-tight">
                Saved
              </h2>
              <span className="text-[11px] leading-3.5 text-on-surface-variant font-medium">
                61 items
              </span>
            </div>
          </div>

          {/* Optional Expandable Search Input */}
          {showSearchBar && (
            <div className="px-4 mt-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved collections or clips..."
                className="w-full h-10 px-4 rounded-full bg-surface-container-lowest text-sm text-on-surface placeholder:text-outline shadow-2xs focus:outline-none"
                autoFocus
              />
            </div>
          )}

          {/* Create New Collection Inline Form */}
          {showNewModal && (
            <form
              onSubmit={handleCreateCollection}
              className="mx-4 mt-3 p-4 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col gap-3"
            >
              <label className="text-xs font-semibold text-on-surface">
                New Collection Name
              </label>
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="e.g. Jannah Reminders, Ramadan Prep..."
                className="w-full h-10 px-3.5 rounded-xl bg-surface-container-low text-sm text-on-surface focus:outline-none"
                autoFocus
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary text-xs font-semibold cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          )}

          {/* Horizontal Filter Pills (Instagram Saved subheader style) */}
          <div className="flex items-center gap-2 overflow-x-auto px-4 py-2 no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs leading-4 whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-primary-dark text-on-primary font-semibold shadow-2xs"
                  : "bg-surface-container text-on-surface font-medium hover:bg-surface-container-high"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("collections")}
              className={`px-4 py-1.5 rounded-full text-xs leading-4 whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === "collections"
                  ? "bg-primary-dark text-on-primary font-semibold shadow-2xs"
                  : "bg-surface-container text-on-surface font-medium hover:bg-surface-container-high"
              }`}
            >
              Collections
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("reminders")}
              className={`px-3.5 py-1.5 rounded-full text-xs leading-4 whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                activeFilter === "reminders"
                  ? "bg-primary-dark text-on-primary font-semibold shadow-2xs"
                  : "bg-surface-container text-on-surface font-medium hover:bg-surface-container-high"
              }`}
            >
              <MaterialIcon name="notifications_active" className={`text-[15px] ${
                  activeFilter === "reminders"
                    ? "text-secondary-container"
                    : "text-secondary"
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
               />
              <span>Reminders (2 active)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("series")}
              className={`px-4 py-1.5 rounded-full text-xs leading-4 whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === "series"
                  ? "bg-primary-dark text-on-primary font-semibold shadow-2xs"
                  : "bg-surface-container text-on-surface font-medium hover:bg-surface-container-high"
              }`}
            >
              Series
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("duas")}
              className={`px-4 py-1.5 rounded-full text-xs leading-4 whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === "duas"
                  ? "bg-primary-dark text-on-primary font-semibold shadow-2xs"
                  : "bg-surface-container text-on-surface font-medium hover:bg-surface-container-high"
              }`}
            >
              Duas
            </button>
          </div>

          {/* Active Reminders Banner / Spiritual Prompts Section */}
          <div className="px-4 mt-2 mb-4">
            <div className="bg-linear-to-r from-primary-container/10 via-primary-fixed/20 to-surface-container-low border border-primary-dark/10 rounded-2xl p-3.5 shadow-2xs">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-dark text-on-primary flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                    <MaterialIcon name="notifications_active" className="text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                     />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] leading-3.5 font-semibold uppercase tracking-wider text-primary-dark">
                        Next Reflection Reminder
                      </span>
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <p className="text-base leading-6 text-on-surface font-semibold mt-0.5">
                      🌅 Fajr Reflection • 05:45 AM
                    </p>
                    <p className="text-xs leading-tight text-on-surface-variant mt-0.5">
                      Gentle prompts to revisit your saved reminders at your
                      chosen times.
                    </p>
                  </div>
                </div>
                <Link
                  className="text-[11px] leading-3.5 text-primary-dark font-semibold hover:underline whitespace-nowrap pt-1"
                  href="/profile"
                >
                  Manage
                </Link>
              </div>
            </div>
          </div>

          {/* Collections Section (Instagram-inspired Carousel / Grid) */}
          <div className="flex flex-col mt-1">
            <div className="flex items-center justify-between px-4 mb-2.5">
              <div className="flex items-center gap-1.5">
                <MaterialIcon name="folder" className="text-xl text-primary-dark"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                 />
                <h3 className="text-lg leading-6 text-on-surface font-semibold">
                  Collections
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className="text-xs leading-4 text-primary-dark font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
                >
                  <span>See all</span>
                  <MaterialIcon name="chevron_right" className="text-base" />
                </button>
              </div>
            </div>

            {/* Horizontal Scrolling Collections Cards */}
            <div className="flex items-stretch gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
              {filteredCollections.map((col) => (
                <Link
                  href="/feed"
                  key={col.id}
                  className="w-44 shrink-0 bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xs flex flex-col cursor-pointer transition-all active:scale-[0.98]"
                >
                  <div className="relative h-28 w-full bg-surface-container grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5">
                    {col.thumbnails.map((thumb, idx) => (
                      <img
                        key={idx}
                        alt={`${col.title} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        src={thumb}
                      />
                    ))}
                    <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center">
                      <MaterialIcon name={col.topBadgeIcon} className="text-[13px]"
                        style={{
                          fontVariationSettings: col.topBadgeFilled
                            ? "'FILL' 1"
                            : "'FILL' 0",
                        }}
                       />
                    </div>
                  </div>
                  <div className="p-2.5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-on-surface-variant mb-0.5">
                        <MaterialIcon name="lock" className="text-xs" />
                        <span>Private • {col.clipsCount} clips</span>
                      </div>
                      <h4 className="text-sm text-on-surface font-semibold leading-snug line-clamp-1">
                        {col.title}
                      </h4>
                    </div>
                    <p
                      className={`text-[11px] mt-1 flex items-center gap-1 ${col.bottomColorClass}`}
                    >
                      {col.bottomIcon && (
                        <MaterialIcon name={col.bottomIcon} className="text-[13px]" />
                      )}
                      <span>{col.bottomText}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Reels and posts Section Header (Instagram-exact layout) */}
          <div className="mt-6 flex flex-col">
            <div className="flex items-center justify-between px-4 mb-2">
              <div className="flex items-center gap-1.5">
                <MaterialIcon name="video_library" className="text-xl text-primary-dark" />
                <h3 className="text-lg leading-6 text-on-surface font-semibold">
                  Reels and posts
                </h3>
              </div>
              <button
                type="button"
                className="text-xs leading-4 text-primary-dark font-semibold hover:underline cursor-pointer"
              >
                Manage
              </button>
            </div>

            {/* Edge-to-edge Instagram 3-column media grid */}
            <div className="grid grid-cols-3 gap-0.5 bg-surface-variant/30">
              {filteredReels.map((item) => (
                <Link
                  href="/feed"
                  key={item.id}
                  className="relative aspect-9/16 bg-surface-container overflow-hidden group cursor-pointer"
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={item.alt}
                    src={item.imageUrl}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute top-2 right-2 text-white drop-shadow-xs">
                    <MaterialIcon name={item.topRightIcon} className="text-lg" />
                  </div>
                  <div className="absolute bottom-2 inset-x-2 text-white">
                    <p className="text-[11px] font-semibold leading-tight line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-white/80">
                      <MaterialIcon name={item.metaIcon} className="text-xs" />
                      <span>{item.metaLabel}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="saved" />
    </div>
  );
}
