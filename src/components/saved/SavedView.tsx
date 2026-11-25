"use client";

import { useState } from "react";
import Link from "next/link";

interface CollectionCardData {
  id: string;
  seriesIcon: string;
  seriesLabel: string;
  seriesColorClass: string;
  title: string;
  subtitle: string;
  rightBadgeType: "pill" | "gold-bookmark" | "green-heart";
  rightBadgeText?: string;
  thumbnails: string[];
}

const INITIAL_COLLECTIONS: CollectionCardData[] = [
  {
    id: "col-fajr",
    seriesIcon: "wb_twilight",
    seriesLabel: "Morning Series",
    seriesColorClass: "text-secondary",
    title: "Reminders for Fajr",
    subtitle: "14 clips • 28 mins total",
    rightBadgeType: "pill",
    rightBadgeText: "2d ago",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwTulnvrJi4D1BSlUNTUVZlPvnYzzy1sf80SqDMEdvJrPSluEATN-h0-Z6Q77L5-HYhFam8cRjg08g81yU5iRvJp4isQxWkT7khkZDcKg1JTnMFryJu_MWUJTzxk1730cKvBdfmIxSDEwfRsNBGDNiGqcGh436IxJwRYDZX5DBJ1zFl9xDYAHDJpRKcq_080wLnNE7r8sem0GE0txTcS6C3S1FIGtYbnPaWlN-zR4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLvCl1QATpcpsLkEITcIkMM1-L7iN1X4YQuDaGKXF3xANEM6W3cyYF5HSp2kjBEZeWP8pb305lS1FckVjK2gtlezUz7cdq_hjQqv9XL7Ze1Dempxco1fT0MP0PzVrXFMc6LWvpJ0Iaw4kD0TCFKoZ6GocD0pgciRjy2HRjdM4V8XD5kiHxtF_c6pGoPwFaFEToyFwlVeEGBkpRPEIMkfEpTPPwYogZ6wWPxQsgC3Y",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC5TEYxkjG1FyVon2-tuKTo4VHT3QVsJ7QL8yVAUD5nmI4wkYnlzYqQviJhWp7u9pCQNCEMP16PuiCu_AFfR3s6RGJYs-_Wz1z0yLV6A8pG-FbWU4BbS_mk9yexRxM79H5iTnkTfMlK85wZQgx5b6IXMigb0v-vzWsjxyLeFyyfMFd14YCyTrbC0zZfy1GHDrt3h-fCtuLY5oEnNLM23SZvTUoyP_eMZNjNxeLFpbI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnKoLm_pHLG7pgtPBptOyBfERghqINUimBdINXiPbAVaC-b4e_etrO5JKgHWJ0TS1T_9J1H5muCbQByz2q8CHnO-XUd-LVvWz3KLSWY8lofukJgMoDAzzEle8y4s39NQLe6DpAiRjbeTDxomsqK6WZgtnFPjwY8At2XdYqPQn6JeBXmQlUmatRlC8-QGj7sOmw9QWWHtdO0p3JgdmWn5mqDxlNO5DYCNzGyF59KWI",
    ],
  },
  {
    id: "col-quran",
    seriesIcon: "star",
    seriesLabel: "Tadabbur",
    seriesColorClass: "text-secondary",
    title: "Quran Reflections",
    subtitle: "22 clips • 45 mins total",
    rightBadgeType: "gold-bookmark",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQoCSD35awrAMDhxCwyURgcbijtXzFe_cLDMUN94vFwF3f2u_RMTyLYLjbacbVTT_r6RXg6mD0qLfoCHlRLDhSRz_pMI-KySriK0b2FzWM6ZptYZDUfmIW1bMnX1GifwQDXW9ABo-Dsd42fopOR9acECROItWFe1jM5QvHprDvcwbZ5Og6dX1hQo2nB9hm3oqqwuHBKsoHFB86uGVQjcWWJo8KQjlD2NjO5ocdhZk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCG5ALxJSUySZDTUfBti4ZGmGeuGYJGF5fvkxzO_TLhdJ4mQn7WnUzM1uXUUoIandCjxUXAaLuTEq-j5Tx1VS930KgusKhuo955cSzxUYFlBxKs_Hh6kevRfDHF4P_RKbJzK7IyRUFhOsbZ3bZjPSeknssx7kwwLa8RFqUfNTQUsp4iZPwjZoLUA_lah1nlKw_HG1LZNvAgC_lawcy7qkxPTp9-MNndl_oU8UQqM3g",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWPQbOf5LZdVw8S9iAIQc6DP03GyagjcN_QzZWRY2GlfA9lKNYB7FYoyKLHUx8x1LwNyRdHdDcKZnBi5yyyE3P3soVJMW1xA8oAV8dpoM3sRl3D9sER_b5UGnohl0NgB6R7saKF94jNUBCR785FxYmj_MD7ih9dbTgsOfPd03jMP9LhtBQgFi-V8_Xj9VU76bB6FRUlbPU4XExqcATTzfeKq0rMCuNkvaRO4_RLM4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA89APyieoh6WR3f8eE7CaOm3Kuyw7ahcrQc78eo_HR25FoL3_DmQ2LLnLiE1TjFv2knxqgIkgR-4OSZy2SkD_kx56cU4dNOX5pRqIwyXCGCfP2WzOSPRlNX7WaTXw3esuBliqCqWI6m2y6I5zRbIGkoSb-ldxGfnE2zEqidgqS7ZWJEW_FdWcraUhvvGeCrGZxRvFZpgH2qIhueTaIOPnrwkmLdBq_Bddgw7CKJ0E",
    ],
  },
  {
    id: "col-duas",
    seriesIcon: "favorite",
    seriesLabel: "Spiritual Healing",
    seriesColorClass: "text-tertiary",
    title: "Duas for Anxiety & Peace",
    subtitle: "9 clips • 18 mins total",
    rightBadgeType: "green-heart",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzRVhQnATrQNNYSAUS7oSQbvIMN2yOgwNNXbVjD5dSDk3M7yXppyKU1Og_JkSxnGQxshBsW3aWtt7Si9nTL3qi8XMHS4ICjF6pbXo9m-7ST50PPwljIU2uBm2fA1657coIZRBZcH2HtK5thnfRkhFML7C0-s2_rx9RPxmlVVBz0lbuHSGnSuiiQ9qkqwF_GJ2CVuuNqnZWiqoMSxP3LzkGpCiLY9XuSmLVoGVvnZM",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCioqZWibODl5gOWwVdog_hkPqLoMnfQl0gtHhmrZRm5eKvW9uLXIQo4xudpXcRIu6apuytIEEp0Q9NGmWi43p0JCKpqFs5m9lbMCmo6EsEPNIkhb9PnaCJFvmUpWB4cCwPD1KPuuluTrYmDwMwjonWwQTC445qC2xUBDfUqGtYWlh-3YkOOuW9Xb-kF1VqcRSygDLHUatIKHyuFyA3u_5Xj1c9FpWQ6SNqcFGah3U",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_cLNjsVy2usMeE6IAqMB0m3lnkoxVjRFmCP9ju2gIvhMo1a4FThufqsAEZiSVrNMXsfBk0L3Ps1vmciDCgs6IyinlBhtycWcnOlxXzo8fp2gBJy_zfO0XOptnLIbo1m-kxcDJbJ_4sSiPNGuSwAaE33oeIoe7nBJ-QxjNwlzD4zFAKKyweqy4vV4dimIBBnrHwm4MJyF6-outw2jDkrKekwa6PnD2hVqVjyVIEmg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDQU0YfuHMJXjaVZXsOZFvwC3Gl72j7QpSmS6SAAdnaveLhFCXco-S7kOc5wJ5_YCilHUiQM8A3U-u6chfRaqD7gI7LLeibrPZt6aKAcRWK1XUfmp7pn9gSeH5Ou0qxQ2aMhEiswAoFUTyquYSrJPWINleV_4dbZVFFmt8gvixYmHNonyE20qMg8Dl_Wgofc_PQqGoxK-HzmplYcCSwS728bZGd7ok6PBXE89oAY",
    ],
  },
  {
    id: "col-parenting",
    seriesIcon: "family_restroom",
    seriesLabel: "Tarbiyah & Akhlaq",
    seriesColorClass: "text-primary-dark",
    title: "Parenting & Character",
    subtitle: "16 clips • 35 mins total",
    rightBadgeType: "pill",
    rightBadgeText: "Updated",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrqGubWELq1s6DXqyLRVRt0hOigUeXG60u3rAqE_DboLbJPYtS2oEovbJRbGWNzzHGAIq4sNSYRJ_vGmkG9ubrTyyo6fghgo6VB7TYkuGlv95ZzwsKmGiB1-BKUkz8WV-bMyYWrHeFA_gT4UVLntjWhzoRTFOvT1Bancwm0cgdDBWyVU8HQQftMINJtul9MQj-7KSZ1YamEvKFA393hq6Qn5jkO-qP6XWoyMAirf0",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7_i1yTi46F3-wqEq9bZTR2ubV4wc6twC37NA4N_ob5gFArhRvxedHoJ56L59ruXvZXmR3Ql0IWsGLXhHY-3inRUKVj9JTxZ_bzs7GutalD4HiEwV7yWoTBiMM8dbkfZojSci3IgBgc-NIfe2hVPO4ReuUI1ui7yHMWScqnNNw5rCR8eK93qLdtLikshw3bwP6q1qZ5gMxWYTRb8kXke0bJZewyk5qGRX6VDfvfWI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCalmxGzHbJvjgQjk-jrhsZDp6IU9ZnOCDA7MSNWBzmSvQaOpoRhmwfIdNE3nU1hRcBlOV0SAxbRPzrEh4vtXUcONgESu7VL6rDnCmzhZaCkKf-OA9SwnxFZczvG0lvfm3-FIWg7Tzd9Xf03nDNaQQYye909rMpU2slm57RqePp1jYInz1PsxKi8Nrdz3qxwkTU6VRPtHa0SRYwdCqf2b9gK6IIru7ksBZX2ywzdTw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKea6oQcczHYA4UqF7k18MP3blAXwiZM9cyX9ifqmImFnXr38D7TnS8wAnIIG9jLbyNbRxSt6-Y3xaj3DWw6WzwbTlBgb95xuBtSs6Rplb6Hc0jQqmGjdOMfFR76YF9yZN31yg8QNuVunJwFnP7eY4b4XMd_hZJDpKH7tip10rhAxX7y-E3erS8D05McfyVSbiOPvdCb5D_PCHcXiHPEfny_AqwxU_ovCfBeWXbyI",
    ],
  },
];

const OFFLINE_ITEMS = [
  {
    id: "off-1",
    title: "Repentance and Hope",
    speaker: "Ustadh Nouman • 18 MB",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGO-4bMHdlcDSLalYAQRZt2iBC1f8nOx7qBmu7-5V6_WZxHz5ipDydVYU7RJ4ZdIe2MrM164JcrjsIUaK5cbsMScl57_TfwJEdx-FyQX3ZyFVCwIds6nheUfrjjPtbAX_4ZtP0pFqId9nf0IGJ9w7d5ASb6yMKGv77BZDO7R-nJHl1iG1pWDhGic9swuD2ckRfLhI7643GWTnvIaIYBdda9gF_bUdzuxXvix2sliY",
  },
  {
    id: "off-2",
    title: "Morning Adhkar with meaning",
    speaker: "Sh. Omar Suleiman • 12 MB",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqn6h_K3qROBoeRXm_AVBkpfrxVqML0FKtZg283sKIi0uLnX0XInqX5odY0nVBYoxKrucyJDeu_BMmOI1vC8kdekIsyYDiaHGXZJddjEM-qhBblk-HVk-htRhqm2hU9R4qy_AOpYc-laTuqb6pJ42o_07P2mUd-qLvxoF2eGGwZuTtPi1g5XNpA0dayzpmbAS4Z9A-AyHxy-oUAjxEkyo57Pyir2f80Cvpve4PAns",
  },
];

export function SavedView() {
  const [activeTab, setActiveTab] = useState<"collections" | "downloaded">(
    "collections"
  );
  const [collections, setCollections] =
    useState<CollectionCardData[]>(INITIAL_COLLECTIONS);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCollectionName.trim();
    if (!trimmed) return;
    const created: CollectionCardData = {
      id: `col-${Date.now()}`,
      seriesIcon: "folder_special",
      seriesLabel: "Personal Theme",
      seriesColorClass: "text-primary-dark",
      title: trimmed,
      subtitle: "1 clip • 2 mins total",
      rightBadgeType: "pill",
      rightBadgeText: "Just now",
      thumbnails: INITIAL_COLLECTIONS[0].thumbnails,
    };
    setCollections((prev) => [created, ...prev]);
    setNewCollectionName("");
    setShowNewModal(false);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-8">
      {/* Header Title & Subtitle */}
      <div className="flex flex-col pt-4 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl leading-8 font-bold text-primary-dark tracking-[-0.01em]">
            Saved &amp; Offline
          </h2>
          <button
            aria-label="Search saved items"
            className="w-10 h-10 rounded-full bg-surface-container-low text-primary-dark flex items-center justify-center hover:bg-surface-container transition-colors shadow-2xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">
              search
            </span>
          </button>
        </div>
        <p className="text-[13px] leading-4.5 text-on-surface-variant mt-1">
          Your personal sanctuary of knowledge
        </p>
      </div>

      {/* Segmented Control Pills */}
      <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-full mt-2 mb-6 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("collections")}
          className={`flex-1 py-2 px-4 rounded-full text-xs leading-4 text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "collections"
              ? "bg-primary-dark text-on-primary font-semibold shadow-2xs"
              : "bg-transparent text-on-surface-variant font-medium"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            folder_special
          </span>
          <span>Collections</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("downloaded")}
          className={`flex-1 py-2 px-4 rounded-full text-xs leading-4 text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "downloaded"
              ? "bg-primary-dark text-on-primary font-semibold shadow-2xs"
              : "bg-transparent text-on-surface-variant font-medium"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            download_done
          </span>
          <span>
            Downloaded{" "}
            <span className="bg-surface-container-highest text-on-surface px-1.5 py-0.5 rounded-full text-[11px] font-semibold ml-0.5">
              6
            </span>
          </span>
        </button>
      </div>

      {/* Create New Collection Modal / Inline Input */}
      {showNewModal && (
        <form
          onSubmit={handleCreateCollection}
          className="mb-4 p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col gap-3"
        >
          <label className="text-sm font-semibold text-on-surface">
            New Collection Name
          </label>
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="e.g. Ramadan Prep, Seerah Gems..."
            className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-sm text-on-surface focus:outline-none"
            autoFocus
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNewModal(false)}
              className="px-4 py-2 rounded-full text-xs font-medium text-on-surface-variant hover:bg-surface-container cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-primary-container text-on-primary text-xs font-semibold cursor-pointer"
            >
              Create Collection
            </button>
          </div>
        </form>
      )}

      {/* Tab 1: Collections View */}
      {activeTab === "collections" && (
        <div className="flex flex-col space-y-4">
          {/* Create New Collection Action Card */}
          <div
            onClick={() => setShowNewModal(true)}
            className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-4 shadow-2xs transition-all active:scale-[0.99] cursor-pointer group"
          >
            <div className="absolute inset-0 bg-primary-dark/5 opacity-50 transition-opacity group-hover:opacity-80" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shadow-2xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">
                  create_new_folder
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg leading-6 text-primary-dark font-semibold">
                  Create New Collection
                </h3>
                <p className="text-[13px] leading-4.5 text-on-surface-variant truncate">
                  Organize clips into themes for contemplation
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container-low text-primary-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">
                  add
                </span>
              </div>
            </div>
          </div>

          {/* Collections Grid (4 Cards) */}
          <div className="grid grid-cols-1 gap-4">
            {collections.map((col) => (
              <Link
                href="/feed"
                key={col.id}
                className="bg-surface-container-lowest rounded-xl p-4 shadow-2xs flex flex-col space-y-3 relative overflow-hidden transition-all active:scale-[0.99]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`material-symbols-outlined text-[15px] ${col.seriesColorClass}`}
                        style={{
                          fontVariationSettings:
                            col.seriesIcon === "star" ||
                            col.seriesIcon === "favorite"
                              ? "'FILL' 1"
                              : "'FILL' 0",
                        }}
                      >
                        {col.seriesIcon}
                      </span>
                      <span
                        className={`text-[11px] leading-3.5 uppercase tracking-wider font-semibold ${col.seriesColorClass}`}
                      >
                        {col.seriesLabel}
                      </span>
                    </div>
                    <h4 className="text-lg leading-6 text-on-surface font-semibold truncate">
                      {col.title}
                    </h4>
                    <p className="text-[13px] leading-4.5 text-on-surface-variant mt-0.5">
                      {col.subtitle}
                    </p>
                  </div>

                  {col.rightBadgeType === "pill" && (
                    <span className="text-[11px] leading-3.5 font-medium bg-surface-container-low text-on-surface-variant px-2 py-1 rounded-full whitespace-nowrap">
                      {col.rightBadgeText}
                    </span>
                  )}
                  {col.rightBadgeType === "gold-bookmark" && (
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        bookmark
                      </span>
                    </div>
                  )}
                  {col.rightBadgeType === "green-heart" && (
                    <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        favorite
                      </span>
                    </div>
                  )}
                </div>

                {/* 4-Thumbnail Preview Grid */}
                <div className="grid grid-cols-4 gap-1.5 rounded-lg overflow-hidden h-20 bg-surface-container">
                  {col.thumbnails.map((thumb, idx) => (
                    <img
                      key={idx}
                      alt={`${col.title} preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                      src={thumb}
                    />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Offline Downloaded Quick Section (Always accessible preview or full tab) */}
      <div className={activeTab === "collections" ? "mt-8 flex flex-col" : "mt-2 flex flex-col"}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary-dark">
              cloud_done
            </span>
            <h3 className="text-lg leading-6 text-on-surface font-semibold">
              Offline Ready
            </h3>
          </div>
          {activeTab === "collections" && (
            <button
              type="button"
              onClick={() => setActiveTab("downloaded")}
              className="text-xs leading-4 text-primary-dark font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              <span>View all 6</span>
              <span className="material-symbols-outlined text-base">
                chevron_right
              </span>
            </button>
          )}
        </div>
        <p className="text-[13px] leading-4.5 text-on-surface-variant mb-2">
          Available instantly without internet connection
        </p>

        <div className="flex flex-col space-y-2">
          {OFFLINE_ITEMS.map((item) => (
            <Link
              href="/feed"
              key={item.id}
              className="bg-surface-container-lowest p-2.5 rounded-xl shadow-2xs flex items-center gap-3 transition-all active:scale-[0.99]"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover"
                  src={item.thumbnail}
                />
                <div className="absolute inset-0 bg-primary-dark/20 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-white text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base leading-5.5 text-on-surface font-medium truncate">
                  {item.title}
                </h4>
                <p className="text-[13px] leading-4.5 text-on-surface-variant truncate">
                  {item.speaker}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-medium leading-none">
                    <span
                      className="material-symbols-outlined text-xs"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span>Offline ready</span>
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-2xs active:scale-95 transition-transform">
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
