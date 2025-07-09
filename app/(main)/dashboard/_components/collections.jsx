"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCollection } from "@/actions/collection";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-form";
import useFetch from "@/hooks/use-fetch";

const Collections = ({ collections = [], entriesByCollection }) => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const router = useRouter(); // ✅ for refreshing server component

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogOpen(false);
      toast.success(`Collection "${createdCollection.name}" created!`);
      router.refresh(); // ✅ re-fetches new data from server
    }
  }, [createdCollection, createCollectionLoading, router]);

  const handleCreateCollection = async (data) => {
    createCollectionFn(data);
  };

  // Optional: show nothing if truly empty
  if (!collections || collections.length === 0) return null;

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Collection Button */}
        <CollectionPreview
          isCreateNew
          onCreateNew={() => setIsCollectionDialogOpen(true)}
        />

        {/* Unorganized Collection */}
        {entriesByCollection?.unorganized?.length > 0 && (
          <CollectionPreview
            name="Unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized
          />
        )}

        {/* User Collections: Only show valid ones */}
        {collections
          ?.filter(
            (collection) =>
              collection?.id &&
              typeof collection.name === "string" &&
              collection.name.trim() !== ""
          )
          .map((collection) => (
            <CollectionPreview
              key={collection.id}
              id={collection.id}
              name={collection.name}
              entries={entriesByCollection[collection.id] || []}
            />
          ))}

        {/* Form Dialog */}
        <CollectionForm
          loading={createCollectionLoading}
          onSuccess={handleCreateCollection}
          open={isCollectionDialogOpen}
          setOpen={setIsCollectionDialogOpen}
        />
      </div>
    </section>
  );
};

export default Collections;
