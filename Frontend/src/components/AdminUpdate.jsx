import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';

const initialFormState = {
  title: '',
  description: '',
  difficulty: 'Easy',
  tags: '',
  inputFormat: '',
  outputFormat: '',
  constraints: '',
  sampleInput: '',
  sampleOutput: '',
};

const difficultyBadgeMap = {
  easy: 'badge-success',
  medium: 'badge-warning',
  hard: 'badge-error',
};

const normalizeDifficultyLabel = (value = '') => {
  const normalized = value.toLowerCase();
  if (normalized === 'easy') return 'Easy';
  if (normalized === 'medium') return 'Medium';
  if (normalized === 'hard') return 'Hard';
  return value || 'Unknown';
};

const normalizeDifficultyValue = (value = '') => value.toLowerCase();

const formatTags = (tags) => {
  if (!tags) return '—';
  if (Array.isArray(tags)) return tags.join(', ');
  return tags;
};

const AdminUpdate = () => {
  const [problems, setProblems] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [tableError, setTableError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [saving, setSaving] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setTableLoading(true);
      setTableError('');
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTableError('Failed to fetch problems.');
    } finally {
      setTableLoading(false);
    }
  };

  const handleOpenModal = async (problemId) => {
    setSelectedProblemId(problemId);
    setModalOpen(true);
    setModalLoading(true);
    setModalError('');
    setFormData(initialFormState);

    try {
      const { data } = await axiosClient.get(`/problem/problemById/${problemId}`);
      setFormData({
        title: data.title || '',
        description: data.description || '',
        difficulty: normalizeDifficultyLabel(data.difficulty || 'Easy'),
        tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '',
        inputFormat: data.inputFormat || '',
        outputFormat: data.outputFormat || '',
        constraints: data.constraints || '',
        sampleInput: data.sampleInput || '',
        sampleOutput: data.sampleOutput || '',
      });
    } catch (err) {
      console.error(err);
      setModalError('Failed to load problem details.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (saving) return;
    setModalOpen(false);
    setModalError('');
    setSelectedProblemId(null);
    setFormData(initialFormState);
    setModalLoading(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    if (!selectedProblemId) return;

    setSaving(true);
    setModalError('');

    const trimmedTags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .join(', ');

    const payload = {
      ...formData,
      tags: trimmedTags,
      difficulty: normalizeDifficultyValue(formData.difficulty || 'Easy'),
    };

    const previousProblems = problems;
    const optimisticRow = {
      ...previousProblems.find((problem) => problem._id === selectedProblemId),
      title: formData.title,
      difficulty: payload.difficulty,
      tags: trimmedTags,
    };

    setProblems((prev) =>
      prev.map((problem) =>
        problem._id === selectedProblemId ? optimisticRow : problem
      )
    );

    try {
      await axiosClient.put(`/problem/update/${selectedProblemId}`, payload);
      setSuccessMessage('Problem updated successfully.');
      handleCloseModal();
      fetchProblems();
    } catch (err) {
      console.error(err);
      setProblems(previousProblems);
      setModalError('Failed to update problem.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Update Problems</h1>
            <p className="text-sm text-base-content/70">
              Manage the problem set and keep content up to date.
            </p>
          </div>
          <button
            onClick={fetchProblems}
            className={`btn btn-sm btn-outline ${tableLoading ? 'loading' : ''}`}
            disabled={tableLoading}
          >
            Refresh
          </button>
        </div>

        {successMessage && (
          <div className="alert alert-success shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setSuccessMessage('')}
            >
              Dismiss
            </button>
          </div>
        )}

        {tableError && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{tableError}</span>
            </div>
          </div>
        )}

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-0">
            {tableLoading ? (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th className="w-1/12">#</th>
                      <th className="w-3/12">Title</th>
                      <th className="w-2/12">Difficulty</th>
                      <th className="w-4/12">Tags</th>
                      <th className="w-2/12 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {problems.map((problem, index) => {
                      const difficultyKey = (problem.difficulty || '').toLowerCase();
                      const badgeClass =
                        difficultyBadgeMap[difficultyKey] || 'badge-secondary';

                      return (
                        <tr key={problem._id}>
                          <th>{index + 1}</th>
                          <td className="font-semibold">{problem.title}</td>
                          <td>
                            <span className={`badge ${badgeClass} badge-lg`}>
                              {normalizeDifficultyLabel(problem.difficulty)}
                            </span>
                          </td>
                          <td className="space-x-1 space-y-1">
                            {formatTags(problem.tags)
                              .split(',')
                              .map((tag) => (
                                <span
                                  key={`${problem._id}-${tag.trim()}`}
                                  className="badge badge-outline"
                                >
                                  {tag.trim() || '—'}
                                </span>
                              ))}
                          </td>
                          <td className="text-right">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleOpenModal(problem._id)}
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`modal modal-bottom sm:modal-middle ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-2xl mb-4">Edit Problem</h3>

          {modalError && (
            <div className="alert alert-error shadow-lg mb-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{modalError}</span>
              </div>
            </div>
          )}

          {modalLoading ? (
            <div className="flex justify-center items-center h-48">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <form onSubmit={handleSaveChanges} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">Title</span>
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">Difficulty</span>
                  </div>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="select select-bordered"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </label>
              </div>

              <label className="form-control">
                <div className="label">
                  <span className="label-text font-semibold">Description</span>
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered h-32"
                  required
                ></textarea>
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text font-semibold">Tags (comma-separated)</span>
                </div>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">Input Format</span>
                  </div>
                  <textarea
                    name="inputFormat"
                    value={formData.inputFormat}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                  ></textarea>
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">Output Format</span>
                  </div>
                  <textarea
                    name="outputFormat"
                    value={formData.outputFormat}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                  ></textarea>
                </label>
              </div>

              <label className="form-control">
                <div className="label">
                  <span className="label-text font-semibold">Constraints</span>
                </div>
                <textarea
                  name="constraints"
                  value={formData.constraints}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered"
                ></textarea>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">Sample Input</span>
                  </div>
                  <textarea
                    name="sampleInput"
                    value={formData.sampleInput}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                  ></textarea>
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text font-semibold">Sample Output</span>
                  </div>
                  <textarea
                    name="sampleOutput"
                    value={formData.sampleOutput}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                  ></textarea>
                </label>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleCloseModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${saving ? 'loading' : ''}`}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="modal-backdrop bg-black/50">
          <button type="button" className="btn" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdate;


