import { useState } from "react";
import { authentication } from "../../store/zustant/useZustandHook";
import { Loading } from "../loading/Loading";

function NewAgentPopUp({ onClose, onSubmit }) {
  const { registerAgent, getUserAgents, loading } = authentication();

  const [form, setForm] = useState({
    agentName: "",
    publicKey: "",
    description: "",
    agentType: "",
    apiEndpoint: "",
    modelName: "",
    version: "",
    executionEnvironment: "",
    metadata: {
      provider: "",
      tier: "",
    },
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleMetadataChange = (e) => {
    const value = e.target.value;

    try {
      const parsed = JSON.parse(value);
      setForm((prev) => ({
        ...prev,
        metadata: parsed,
      }));
    } catch {
      // ignore while typing invalid JSON
    }
  };

  const metadataString = JSON.stringify(form.metadata, null, 2);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      agentName: form.agentName,
      publicKey: form.publicKey,
      description: form.description,
      agentType: form.agentType,
      apiEndpoint: form.apiEndpoint,
      modelName: form.modelName,
      version: form.version,
      executionEnvironment: form.executionEnvironment,
      metadata: form.metadata,
    };

    await registerAgent(payload);
    await getUserAgents();
    onClose?.(true);
    onSubmit?.(payload);
  }



  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 shadow-2xl text-sm text-gray-200">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Register New Agent</h2>
          <p className="text-xs text-gray-400">
            Define capabilities and metadata for your on‑chain or off‑chain agent.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-white/5 px-2 py-1 text-sm text-gray-300 hover:bg-white/10"
          onClick={() => onClose?.()}
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Identity section */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Identity
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Agent Name */}
            <div className="form-control">
              <label className="mb-1 block text-xs text-gray-400">
                Agent name
              </label>
              <input
                type="text"
                className="input px-2 input-bordered w-full border-white/10 bg-black/40 text-sm text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
                placeholder="Treasury Risk Monitor"
                value={form.agentName}
                onChange={handleChange("agentName")}
              />
            </div>

            {/* Agent Type */}
            <div className="form-control">
              <label className="mb-1 block text-xs text-gray-400">
                Agent type
              </label>
              <input
                type="text"
                className="input px-2 input-bordered w-full border-white/10 bg-black/40 text-sm text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
                placeholder="risk-monitor"
                value={form.agentType}
                onChange={handleChange("agentType")}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-3 form-control">
            <label className="mb-1 block text-xs text-gray-400">
              Description
            </label>
            <textarea
              className="textarea px-2 textarea-bordered w-full border-white/10 bg-black/40 text-sm text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
              placeholder="Monitors treasury and payment risk for the DAO."
              value={form.description}
              onChange={handleChange("description")}
              rows={3}
            />
          </div>
        </section>

        {/* Connectivity section */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Connectivity
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Public Key */}
            <div className="form-control">
              <label className="mb-1 block text-xs text-gray-400">
                Public key
              </label>
              <input
                type="text"
                className="input input-bordered w-full border-white/10 bg-black/40 text-xs font-mono text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
                placeholder="0x42Ec816b0923eEF0c76589627107AdaBb749AB75"
                value={form.publicKey}
                onChange={handleChange("publicKey")}
              />
            </div>

            {/* API Endpoint */}
            <div className="form-control">
              <label className="mb-1 block text-xs text-gray-400">
                API endpoint
              </label>
              <input
                type="text"
                className="input px-2 input-bordered w-full border-white/10 bg-black/40 text-sm text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
                placeholder="https://agent.example.com/api"
                value={form.apiEndpoint}
                onChange={handleChange("apiEndpoint")}
              />
            </div>
          </div>
        </section>

        {/* Runtime section */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Runtime
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Model Name */}
            <div className="form-control">
              <label className="mb-1 block text-xs text-gray-400">
                Model name
              </label>
              <input
                type="text"
                className="input px-2 input-bordered w-full border-white/10 bg-black/40 text-sm text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
                placeholder="gpt-4.1"
                value={form.modelName}
                onChange={handleChange("modelName")}
              />
            </div>

            {/* Version */}
            <div className="form-control">
              <label className="mb-1 block text-xs text-gray-400">
                Version
              </label>
              <input
                type="text"
                className="input px-2 input-bordered w-full border-white/10 bg-black/40 text-sm text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
                placeholder="1.0.0"
                value={form.version}
                onChange={handleChange("version")}
              />
            </div>

            {/* Execution Environment */}
            <div className="form-control">
              <label className="mb-1 block text-xs text-gray-400">
                Execution environment
              </label>
              <input
                type="text"
                className="input px-2 input-bordered w-full border-white/10 bg-black/40 text-sm text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
                placeholder="api"
                value={form.executionEnvironment}
                onChange={handleChange("executionEnvironment")}
              />
            </div>
          </div>
        </section>

        {/* Metadata section */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Metadata
          </h3>

          <div className="form-control">
            <label className="mb-1 block text-xs text-gray-400">
              Metadata (JSON)
            </label>
            <textarea
              rows={4}
              cols={30}
              className="textarea px-2 textarea-bordered w-full border-white/10 bg-black/40 text-xs font-mono text-gray-100 placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
              placeholder={`{"provider": "openai", "tier": "production"}`}
              value={metadataString}
              onChange={handleMetadataChange}
            />
          </div>
        </section>

        {/* Actions */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-gray-200 hover:bg-white/10"
            onClick={() => onClose?.()}
          >
            Cancel
          </button>
          {loading?<Loading />:<button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
          >
            Register Agent
          </button>}
        </div>
      </form>
    </div>
  );
}

export default NewAgentPopUp;