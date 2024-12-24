import React, { useState } from "react";
import "./DeploymentForm.css"; // For styling

function DeploymentForm() {
    const [form, setForm] = useState({
        ami: "",
        provider: "",
        instanceType: "",
        region: "",
        awsAccessKey: "",
        awsSecretKey: "",
        gcpServiceAccount: "",
        azureClientId: "",
        azureClientSecret: "",
    });

    const handleSubmit = async () => {
        try {
            // API endpoint for backend
            const response = await fetch("http://localhost:8000/deploy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form), // Send the entire form data
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Deployment initiated: ${result.status}`);
            } else {
                alert(`Error: ${result.detail}`);
            }
        } catch (error) {
            console.error("Error during deployment:", error);
            alert("An error occurred during deployment. Check the console for details.");
        }
    };

    return (
        <div className="form-container">
            <h1>Deploy Instance</h1>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="AMI ID"
                    value={form.ami}
                    onChange={(e) => setForm({ ...form, ami: e.target.value })}
                />
            </div>
            <div className="form-group">
                <select
                    value={form.provider}
                    onChange={(e) => setForm({ ...form, provider: e.target.value })}
                >
                    <option value="">Select Provider</option>
                    <option value="aws">AWS</option>
                    <option value="gcp">GCP</option>
                    <option value="azure">Azure</option>
                </select>
            </div>
            {form.provider === "aws" && (
                <>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="AWS Access Key"
                            value={form.awsAccessKey}
                            onChange={(e) =>
                                setForm({ ...form, awsAccessKey: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="AWS Secret Key"
                            value={form.awsSecretKey}
                            onChange={(e) =>
                                setForm({ ...form, awsSecretKey: e.target.value })
                            }
                        />
                    </div>
                </>
            )}
            {form.provider === "gcp" && (
                <div className="form-group">
                    <textarea
                        placeholder="GCP Service Account (JSON)"
                        value={form.gcpServiceAccount}
                        onChange={(e) =>
                            setForm({ ...form, gcpServiceAccount: e.target.value })
                        }
                    />
                </div>
            )}
            {form.provider === "azure" && (
                <>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Azure Client ID"
                            value={form.azureClientId}
                            onChange={(e) =>
                                setForm({ ...form, azureClientId: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Azure Client Secret"
                            value={form.azureClientSecret}
                            onChange={(e) =>
                                setForm({ ...form, azureClientSecret: e.target.value })
                            }
                        />
                    </div>
                </>
            )}
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Instance Type"
                    value={form.instanceType}
                    onChange={(e) =>
                        setForm({ ...form, instanceType: e.target.value })
                    }
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Region"
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                />
            </div>
            <button className="submit-btn" onClick={handleSubmit}>
                Deploy
            </button>
        </div>
    );
}

export default DeploymentForm;