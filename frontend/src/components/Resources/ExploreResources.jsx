import React, { useEffect } from "react";
import { useResourceStore } from "../../store/useResourceStore";
import { Link, MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const ExploreResources = () => {
  const {
    fetchResources,
    resources,
    loading,
    error,
    upvoteResource,
    downvoteResource,
  } = useResourceStore();

  const { user } = useAuthStore();
  const userId = user?._id;

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="min-h-screen mt-10 px-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {loading && <span className="loading loading-spinner loading-lg"></span>}
          {error && <p className="text-error text-lg">{error}</p>}

          {resources.length > 0
            ? resources.map((resource) => {
              const hasUpvoted = resource.upvotedBy?.includes(userId);
              const hasDownvoted = resource.downvotedBy?.includes(userId);

              return (
                <div
                  key={resource._id}
                  className="card w-full bg-base-100 shadow-lg hover:shadow-2xl border hover:border-primary transition-all duration-300 cursor-pointer"
                >
                  <figure>
                    <img
                      src={resource.resourceImage}
                      alt="Resource"
                      className="h-56 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{resource.title}</h2>

                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag) => (
                        <div key={tag} className="badge badge-outline">
                          {tag}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-3">
                        {/* Upvote Button */}
                        <div className="tooltip" data-tip="Upvotes">
                          <button
                            className="btn btn-sm btn-ghost flex gap-1"
                            onClick={() => upvoteResource(resource._id)}
                          >
                            <ThumbsUp
                              className={`w-6 h-6 ${hasUpvoted ? "text-green-500" : "text-gray-500"
                                }`}
                            />
                            {resource.upvotes}
                          </button>
                        </div>

                        {/* Downvote Button */}
                        <div className="tooltip" data-tip="Downvotes">
                          <button
                            className="btn btn-sm btn-ghost flex gap-1"
                            onClick={() => downvoteResource(resource._id)}
                          >
                            <ThumbsDown
                              className={`w-6 h-6 ${hasDownvoted ? "text-red-500" : "text-gray-500"
                                }`}
                            />
                            {resource.downvotes}
                          </button>
                        </div>
                      </div>

                      {/* Comments Button */}
                      <div className="tooltip" data-tip="Comments">
                        <button className="btn btn-sm btn-ghost flex gap-1">
                          <MessageSquareText className="w-6 h-6" /> {resource.comments.length}
                        </button>
                      </div>

                      {/* View Resource Button */}
                      <div className="tooltip" data-tip="View Resource">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline"
                        >
                          <Link className="w-6 h-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
            : !loading && (
              <p className="text-lg text-center text-gray-500">No resources found.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ExploreResources;
